import { UserRole } from "./prisma";

export interface DocumentFilter {
  domainId?: string;
  subdomainId?: string;
  authorId?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export interface DomainFilter {
  search?: string;
  page?: number;
  limit?: number;
}

export interface UserFilter {
  role?: UserRole;
  search?: string;
  page?: number;
  limit?: number;
}