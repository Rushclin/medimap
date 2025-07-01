import { PaginationDto } from './base.dto';

export class PaginatedResultDto<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    lastPage: number;
  };
}

export class DocumentPaginationDto extends PaginationDto {
  domainId?: string;
  subdomainId?: string;
}
