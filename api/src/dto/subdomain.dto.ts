import { BaseDto } from './base.dto';
import { DocumentDto } from './document.dto';

export class CreateSubdomainDto {
  name: string;
  description?: string;
  domainId: string;
}

export class UpdateSubdomainDto {
  name?: string;
  description?: string;
  domainId?: string;
}

export class SubdomainDto extends BaseDto {
  name: string;
  description?: string;
  domainId: string;
}

export class SubdomainWithDocumentsDto extends SubdomainDto {
  documents: DocumentDto[];
}
