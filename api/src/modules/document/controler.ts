import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { DocumentService } from './service';
import {
  CreateDocumentDto,
  DocumentPaginationDto,
  UpdateDocumentDto,
} from 'src/dto';

@ApiTags('Documents')
@Controller('documents')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new document' })
  @ApiResponse({ status: 201, description: 'Document created successfully' })
  create(@Body() createDocumentDto: CreateDocumentDto) {
    return this.documentService.create(createDocumentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all documents with pagination' })
  findAll(@Query() paginationDto: DocumentPaginationDto) {
    return this.documentService.findAll(paginationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get document by ID' })
  @ApiResponse({ status: 404, description: 'Document not found' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.documentService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update document by ID' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDocumentDto: UpdateDocumentDto,
  ) {
    return this.documentService.update(id, updateDocumentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete document by ID' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.documentService.remove(id);
  }

  @Get('domain/:domainId')
  @ApiOperation({ summary: 'Get documents by domain ID' })
  findByDomain(@Param('domainId', ParseUUIDPipe) domainId: string) {
    return this.documentService.findByDomain(domainId);
  }
}
