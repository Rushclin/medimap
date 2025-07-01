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
// import { SubdomainService } from './service';
// import { CreateSubdomainDto, UpdateSubdomainDto, PaginationDto } from '../dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SubdomainService } from './service';
import { CreateSubdomainDto, PaginationDto, UpdateSubdomainDto } from 'src/dto';

@ApiTags('Subdomains')
@Controller('subdomains')
export class SubdomainController {
  constructor(private readonly subdomainService: SubdomainService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new subdomain' })
  create(@Body() createSubdomainDto: CreateSubdomainDto) {
    return this.subdomainService.create(createSubdomainDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all subdomains with pagination' })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.subdomainService.findAll(paginationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get subdomain by ID with documents' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.subdomainService.findOne(id);
  }

  @Get('domain/:domainId')
  @ApiOperation({ summary: 'Get subdomains by domain ID' })
  findByDomain(@Param('domainId', ParseUUIDPipe) domainId: string) {
    return this.subdomainService.findByDomain(domainId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update subdomain by ID' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateSubdomainDto: UpdateSubdomainDto,
  ) {
    return this.subdomainService.update(id, updateSubdomainDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete subdomain by ID' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.subdomainService.remove(id);
  }
}
