import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Expose } from './prisma.interface';
import { PrismaClient, User } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  expose<T>(item: T): Expose<T> {
    if (!item) return {} as T;
    delete (item as any as Partial<User>).password;
    return item;
  }
}
