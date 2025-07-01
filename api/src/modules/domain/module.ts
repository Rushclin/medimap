import { Module } from '@nestjs/common';
import { DomainService } from './service';
import { PrismaModule } from 'src/providers/prisma/prisma.module';
import { DomainController } from './controller';

@Module({
  imports: [PrismaModule],
  controllers: [DomainController],
  providers: [DomainService],
  exports: [DomainService],
})
export class DomainModule {}
