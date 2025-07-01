import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/providers/prisma/prisma.module';
import { SubdomainController } from './controller';
import { SubdomainService } from './service';

@Module({
  imports: [PrismaModule],
  controllers: [SubdomainController],
  providers: [SubdomainService],
  exports: [SubdomainService],
})
export class SubdomainModule {}
