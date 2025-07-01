import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DomainMapper } from 'src/common/mappers';
import { CreateDomainDto, PaginationDto, UpdateDomainDto } from 'src/dto';
import { PrismaService } from 'src/providers/prisma/prisma.service';

@Injectable()
export class DomainService {
  constructor(private prisma: PrismaService) {}

  async create(createDomainDto: CreateDomainDto) {
    try {
      const domain = await this.prisma.domain.create({
        data: createDomainDto,
      });
      return DomainMapper.toDto(domain);
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { page = 1, limit = 10, search } = paginationDto;
    const skip = (page - 1) * limit;

    const where: Prisma.DomainWhereInput = {};
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { description: { contains: search } },
      ];
    }

    const [domains, total] = await Promise.all([
      this.prisma.domain.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.domain.count({ where }),
    ]);

    return {
      data: domains.map((dd) => DomainMapper.toDto(dd)),
      meta: {
        total,
        page,
        limit,
        lastPage: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const domain = await this.prisma.domain.findUnique({
      where: { id },
      include: { subdomains: true },
    });

    if (!domain) {
      throw new NotFoundException(`Domain with ID ${id} not found`);
    }

    return DomainMapper.toDtoWithSubdomains(domain);
  }

  async update(id: string, updateDomainDto: UpdateDomainDto) {
    try {
      const domain = await this.prisma.domain.update({
        where: { id },
        data: updateDomainDto,
      });
      return DomainMapper.toDto(domain);
    } catch (error) {
      this.handlePrismaError(error, id);
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.domain.delete({ where: { id } });
      return { message: 'Domain deleted successfully' };
    } catch (error) {
      this.handlePrismaError(error, id);
    }
  }

  private handlePrismaError(error: any, id?: string) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      switch (error.code) {
        case 'P2002':
          throw new BadRequestException('Domain name already exists');
        case 'P2025':
          throw new NotFoundException(
            id ? `Domain with ID ${id} not found` : 'Record not found',
          );
        case 'P2003':
          throw new BadRequestException(
            'Cannot delete domain with existing subdomains',
          );
      }
    }
    throw error;
  }
}
