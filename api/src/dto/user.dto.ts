import { UserRole } from '@prisma/client';
import { BaseDto, PaginationDto } from './base.dto';
import { IsOptional, IsString } from 'class-validator';

// Création
export class CreateUserDto {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
}

// Mise à jour
export class UpdateUserDto {
  name?: string;
  email?: string;
  password?: string;
  role?: UserRole;
}

// Réponse
export class UserDto extends BaseDto {
  name: string;
  email: string;
  role: UserRole;
}

// Connexion
export class LoginUserDto {
  email: string;
  password: string;
}

export class UserPaginationDto extends PaginationDto {
  @IsOptional()
  @IsString()
  role?: UserRole;
}
