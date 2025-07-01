import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DocumentMapper } from 'src/common/mappers';
import {
  CreateDocumentDto,
  DocumentPaginationDto,
  DocumentWithRelationsDto,
  UpdateDocumentDto,
} from 'src/dto';
import { PrismaService } from 'src/providers/prisma/prisma.service';

@Injectable()
export class DocumentService {
  constructor(private prisma: PrismaService) {}

  async create(createDocumentDto: CreateDocumentDto) {
    try {
      const document = await this.prisma.document.create({
        data: {
          ...createDocumentDto,
        },
        include: {
          domain: true,
          subdomain: true,
          author: true,
        },
      });

      return DocumentMapper.toDtoWithRelations(document);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException(
            'Document with similar properties already exists',
          );
        }
        if (error.code === 'P2003') {
          throw new BadRequestException(
            'Invalid domain, subdomain or author ID',
          );
        }
      }
      throw error;
    }
  }

  async findAll(paginationDto: DocumentPaginationDto) {
    const {
      page = 1,
      limit = 10,
      search,
      domainId,
      subdomainId,
    } = paginationDto;
    const skip = (page - 1) * limit;
    const take = limit;

    const where: Prisma.DocumentWhereInput = {};
    if (domainId) where.domainId = domainId;
    if (subdomainId) where.subdomainId = subdomainId;
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { description: { contains: search } },
      ];
    }

    const [documents, total] = await Promise.all([
      this.prisma.document.findMany({
        where,
        skip,
        take,
        include: {
          domain: true,
          subdomain: true,
          author: true,
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.document.count({ where }),
    ]);

    return {
      data: documents.map((d) => DocumentMapper.toDtoWithRelations(d)),
      meta: {
        total,
        page,
        limit,
        lastPage: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string): Promise<DocumentWithRelationsDto> {
    const document = await this.prisma.document.findUnique({
      where: { id },
      include: {
        domain: true,
        subdomain: true,
        author: true,
      },
    });

    if (!document) {
      throw new NotFoundException(`Document with ID ${id} not found`);
    }

    return DocumentMapper.toDtoWithRelations(document);
  }

  async update(id: string, updateDocumentDto: UpdateDocumentDto) {
    try {
      const document = await this.prisma.document.update({
        where: { id },
        data: {
          ...updateDocumentDto,
          subdomainId:
            updateDocumentDto.subdomainId === null
              ? null
              : updateDocumentDto.subdomainId,
        },
        include: {
          domain: true,
          subdomain: true,
          author: true,
        },
      });

      return DocumentMapper.toDtoWithRelations(document);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Document with ID ${id} not found`);
        }
      }
      throw error;
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.document.delete({ where: { id } });
      return { message: 'Document deleted successfully' };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Document with ID ${id} not found`);
        }
      }
      throw error;
    }
  }

  async findByDomain(domainId: string) {
    const documents = await this.prisma.document.findMany({
      where: { domainId },
      include: {
        domain: true,
        subdomain: true,
        author: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return documents.map((d) => DocumentMapper.toDtoWithRelations(d));
  }
}
