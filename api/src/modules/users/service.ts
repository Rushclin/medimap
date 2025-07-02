import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
// import { compare, hash } from 'bcrypt';
import * as bcrypt from 'bcryptjs';
import { Prisma, UserRole } from '@prisma/client';
import { UserMapper } from 'src/common/mappers';
import { CreateUserDto, UpdateUserDto, UserPaginationDto } from 'src/dto';
import { EMAIL_USER_CONFLICT } from 'src/errors/errors.constants';
import { PrismaService } from 'src/providers/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const testUser = await this.findByEmail(createUserDto.email);
      if (testUser) {
        throw new ConflictException(EMAIL_USER_CONFLICT);
      }
      const hashedPassword = await this.hashAndValidatePassword(
        createUserDto.password,
      );

      const user = await this.prisma.user.create({
        data: {
          ...createUserDto,
          password: hashedPassword,
          role: createUserDto.role || UserRole.USER,
        },
      });

      return UserMapper.toDto(user);
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  async hashAndValidatePassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async findAll(paginationDto: UserPaginationDto) {
    const { page = 1, limit = 10, search } = paginationDto;
    const skip = (page - 1) * limit;

    const where: Prisma.UserWhereInput = {};
    if (search) {
      where.OR = [
        { firstName: { contains: search } },
        { email: { contains: search } },
      ];
    }

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.user.count({ where }),
    ]);

    return {
      data: users.map((u) => UserMapper.toDto(u)),
      meta: {
        total,
        page,
        limit,
        lastPage: Math.ceil(total / limit),
      },
    };
  }

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return UserMapper.toDto(user);
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  //   async findByResetToken(token: string) {
  //     return this.prisma.user.findFirst({
  //       where: {
  //         resetPasswordToken: token,
  //         resetPasswordExpires: { gt: new Date() },
  //       },
  //     });
  //   }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const data: Prisma.UserUpdateInput = { ...updateUserDto };

      if (updateUserDto.password) {
        data.password = await bcrypt.hash(updateUserDto.password, 10);
      }

      const user = await this.prisma.user.update({
        where: { id },
        data,
      });

      return UserMapper.toDto(user);
    } catch (error) {
      this.handlePrismaError(error, id);
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.user.delete({ where: { id } });
      return { message: 'User deleted successfully' };
    } catch (error) {
      this.handlePrismaError(error, id);
    }
  }

  private handlePrismaError(error: any, id?: string) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      switch (error.code) {
        case 'P2002':
          throw new ConflictException('Email already exists');
        case 'P2025':
          throw new NotFoundException(
            id ? `User with ID ${id} not found` : 'Record not found',
          );
      }
    }
    throw error;
  }
}
