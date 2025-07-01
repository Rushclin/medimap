export class BaseDto {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export class PaginationDto {
  page?: number = 1;
  limit?: number = 10;
  search?: string;
}
