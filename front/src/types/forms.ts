import { UserRole } from './prisma';

// Types pour les payloads d'API
export type LoginFormData = {
  email: string;
  password: string;
};

export type RegisterFormData = {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
};

export type DocumentFormData = {
  title: string;
  description: string;
  content?: string;
  domainId: string;
  subdomainId?: string | null;
};

export type DomainFormData = {
  name: string;
  description?: string;
};

export type SubdomainFormData = {
  name: string;
  description?: string;
  domainId: string;
};

export type UserUpdateFormData = {
  name?: string;
  email?: string;
  role?: UserRole;
};