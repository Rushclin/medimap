import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { SubdomainMapper } from 'src/common/mappers';
import { CreateSubdomainDto, UpdateSubdomainDto, PaginationDto } from 'src/dto';
import { PrismaService } from 'src/providers/prisma/prisma.service';

@Injectable()
export class SubdomainService {
  constructor(private prisma: PrismaService) {}

  async create(createSubdomainDto: CreateSubdomainDto) {
    try {
      const subdomain = await this.prisma.subdomain.create({
        data: createSubdomainDto,
      });
      return SubdomainMapper.toDto(subdomain);
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { page = 1, limit = 10, search } = paginationDto;
    const skip = (page - 1) * limit;

    const where: Prisma.SubdomainWhereInput = {};
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { description: { contains: search } },
      ];
    }

    const [subdomains, total] = await Promise.all([
      this.prisma.subdomain.findMany({
        where,
        skip,
        take: limit,
        include: { domain: true },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.subdomain.count({ where }),
    ]);

    return {
      data: subdomains.map((s) => SubdomainMapper.toDtoWithDomain(s)),
      meta: {
        total,
        page,
        limit,
        lastPage: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const subdomain = await this.prisma.subdomain.findUnique({
      where: { id },
      include: {
        domain: true,
        documents: {
          select: {
            id: true,
            title: true,
            createdAt: true,
            author: true,
            authorId: true,
            content: true,
            description: true,
            domain: true,
            domainId: true,
            subdomain: true,
            subdomainId: true,
            updatedAt: true,
            url: true,
          },
          take: 5,
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!subdomain) {
      throw new NotFoundException(`Subdomain with ID ${id} not found`);
    }

    return SubdomainMapper.toDtoWithDocuments(subdomain);
  }

  async findByDomain(domainId: string) {
    const subdomains = await this.prisma.subdomain.findMany({
      where: { domainId },
      include: { domain: true },
    });
    return subdomains.map((s) => SubdomainMapper.toDtoWithDomain(s));
  }

  async update(id: string, updateSubdomainDto: UpdateSubdomainDto) {
    try {
      const subdomain = await this.prisma.subdomain.update({
        where: { id },
        data: updateSubdomainDto,
      });
      return SubdomainMapper.toDto(subdomain);
    } catch (error) {
      this.handlePrismaError(error, id);
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.subdomain.delete({ where: { id } });
      return { message: 'Subdomain deleted successfully' };
    } catch (error) {
      this.handlePrismaError(error, id);
    }
  }

  private handlePrismaError(error: any, id?: string) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      switch (error.code) {
        case 'P2002':
          throw new BadRequestException('Subdomain name already exists');
        case 'P2025':
          throw new NotFoundException(
            id ? `Subdomain with ID ${id} not found` : 'Record not found',
          );
        case 'P2003':
          throw new BadRequestException(
            'Cannot delete subdomain with existing documents',
          );
      }
    }
    throw error;
  }
}
