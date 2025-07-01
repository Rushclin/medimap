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
import { DomainService } from './service';
// import { CreateDomainDto, UpdateDomainDto, PaginationDto } from '../dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateDomainDto, PaginationDto, UpdateDomainDto } from 'src/dto';

@ApiTags('Domains')
@Controller('domains')
export class DomainController {
  constructor(private readonly domainService: DomainService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new domain' })
  @ApiResponse({ status: 201, description: 'Domain created successfully' })
  create(@Body() createDomainDto: CreateDomainDto) {
    return this.domainService.create(createDomainDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all domains with pagination' })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.domainService.findAll(paginationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get domain by ID with subdomains' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.domainService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update domain by ID' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDomainDto: UpdateDomainDto,
  ) {
    return this.domainService.update(id, updateDomainDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete domain by ID' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.domainService.remove(id);
  }
}
