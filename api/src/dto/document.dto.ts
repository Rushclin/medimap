import { BaseDto } from './base.dto';
import { DomainDto } from './domain.dto';
import { SubdomainDto } from './subdomain.dto';
import { UserDto } from './user.dto';

export class CreateDocumentDto {
  title: string;
  description: string;
  content?: string;
  url: string;
  domainId: string;
  subdomainId?: string;
  authorId: string;
}

export class UpdateDocumentDto {
  title?: string;
  description?: string;
  content?: string;
  url?: string;
  domainId?: string;
  subdomainId?: string | null;
}

export class DocumentDto extends BaseDto {
  title: string;
  description: string;
  content?: string;
  url: string;
  domainId: string;
  subdomainId?: string;
  authorId: string;
}

export class DocumentWithRelationsDto extends DocumentDto {
  domain: DomainDto;
  subdomain?: SubdomainDto;
  author: UserDto;
}

export class DocumentFilterDto {
  domainId?: string;
  subdomainId?: string;
  authorId?: string;
  search?: string;
}
