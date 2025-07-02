import { User } from '@prisma/client';

import {UserDto} from '../dto';

export class UserMapper {
  static toDto(user: User): UserDto {
    return {
      id: user.id,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    };
  }

  static toProfileDto(
    user: User & {
      documents?: Array<{
        id: string;
        title: string;
        createdAt: Date;
      }>;
    },
  ) {
    const base = this.toDto(user);
    return {
      ...base,
      documents: user.documents?.map((doc) => ({
        id: doc.id,
        title: doc.title,
        createdAt: doc.createdAt,
      })),
    };
  }
  static toAuthDto(user: User) {
    return {
      id: user.id,
      email: user.email,
      role: user.role,
    };
  }
}

// export class DomainMapper {
//   static toDto(domain: Domain): DomainDto {
//     return {
//       id: domain.id,
//       createdAt: domain.createdAt,
//       updatedAt: domain.updatedAt,
//       name: domain.name,
//       description: domain.description || undefined,
//     };
//   }

//   static toDtoWithSubdomains(
//     domain: Domain & {
//       subdomains: Array<Subdomain>;
//     },
//   ): DomainWithSubdomainsDto {
//     const base = this.toDto(domain);
//     // const subdomain = SubdomainMapper.toDto()

//     return {
//       ...base,
//       subdomains: domain.subdomains.map((subdomain) =>
//         SubdomainMapper.toDto(subdomain),
//       ),
//     };
//   }
// }

// export class SubdomainMapper {
//   static toDto(subdomain: Subdomain): SubdomainDto {
//     return {
//       id: subdomain.id,
//       createdAt: subdomain.createdAt,
//       updatedAt: subdomain.updatedAt,
//       name: subdomain.name,
//       description: subdomain.description || undefined,
//       domainId: subdomain.domainId,
//     };
//   }

//   static toDtoWithDocuments(
//     subdomain: Subdomain & {
//       documents: Array<Document>;
//       domain: {
//         id: string;
//         name: string;
//       };
//     },
//   ): SubdomainWithDocumentsDto {
//     const base = this.toDto(subdomain);
//     return {
//       ...base,
//       documents: subdomain.documents.map((doc) => DocumentMapper.toDto(doc)),
//       // domain: {
//       //   id: subdomain.domain.id,
//       //   name: subdomain.domain.name,
//       // },
//     };
//   }

//   static toDtoWithDomain(
//     subdomain: Subdomain & {
//       domain: { id: string; name: string };
//     },
//   ) {
//     const base = this.toDto(subdomain);
//     return {
//       ...base,
//       domain: {
//         id: subdomain.domain.id,
//         name: subdomain.domain.name,
//       },
//     };
//   }
// }

// export class DocumentMapper {
//   static toDto(document: Document): DocumentDto {
//     return {
//       id: document.id,
//       createdAt: document.createdAt,
//       updatedAt: document.updatedAt,
//       title: document.title,
//       description: document.description,
//       content: document.content || undefined,
//       url: document.url,
//       domainId: document.domainId,
//       subdomainId: document.subdomainId || undefined,
//       authorId: document.authorId,
//     };
//   }

//   static toDtoWithRelations(
//     document: Document & {
//       domain: Domain;
//       subdomain: Subdomain | null;
//       author: User;
//     },
//   ): DocumentWithRelationsDto {
//     // const { domain, subdomain, author } = document;
//     const base = this.toDto(document);
//     const domain = DomainMapper.toDto(document.domain);
//     const subdomain = document.subdomain
//       ? SubdomainMapper.toDto(document.subdomain)
//       : undefined;
//     const author = UserMapper.toDto(document.author);

//     return {
//       ...base,
//       domain,
//       subdomain,
//       author,
//     };
//   }
// }
