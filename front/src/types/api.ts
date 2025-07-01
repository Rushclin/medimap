import { 
  User, 
  DocumentWithRelations, 
  DomainWithRelations,
  SubdomainWithDocuments 
} from './prisma';

export interface ApiResponse<T> {
  data: T;
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
    lastPage?: number;
  };
  error?: string;
}

export type LoginResponse = {
  user: User;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
};

export type DocumentsResponse = ApiResponse<DocumentWithRelations[]>;
export type DocumentResponse = ApiResponse<DocumentWithRelations>;
export type DomainsResponse = ApiResponse<DomainWithRelations[]>;
export type SubdomainsResponse = ApiResponse<SubdomainWithDocuments[]>;
export type UsersResponse = ApiResponse<User[]>;