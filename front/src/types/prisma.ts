// Types de base correspondant à votre schéma Prisma
export type UserRole = 'ADMIN' | 'EDITOR' | 'USER';

export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User extends BaseEntity {
  name: string;
  email: string;
  role?: UserRole;
  // Ne pas inclure le mot de passe dans les types frontend
}

export interface Domain extends BaseEntity {
  name: string;
  description?: string;
}

export interface Subdomain extends BaseEntity {
  name: string;
  description?: string;
  domainId: string;
}

export interface Document extends BaseEntity {
  title: string;
  description: string;
  content?: string;
  url: string;
  domainId: string;
  subdomainId?: string;
  authorId: string;
  author: User;
}

// Types avec relations
export interface UserWithDocuments extends User {
  documents: Document[];
}

export interface DomainWithSubdomains extends Domain {
  subdomains: Subdomain[];
}

export interface DomainWithRelations extends DomainWithSubdomains {
  documents: Document[];
}

export interface SubdomainWithDocuments extends Subdomain {
  documents: Document[];
  domain: Domain;
}

export interface DocumentWithRelations extends Document {
  domain: Domain;
  subdomain?: Subdomain;
  author: User;
}