import { BaseDto } from './base.dto';
import { SubdomainDto } from './subdomain.dto';

export class CreateDomainDto {
  name: string;
  description?: string;
}

export class UpdateDomainDto {
  name?: string;
  description?: string;
}

export class DomainDto extends BaseDto {
  name: string;
  description?: string;
}

export class DomainWithSubdomainsDto extends DomainDto {
  subdomains: SubdomainDto[];
}
