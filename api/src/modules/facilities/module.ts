import { Module } from '@nestjs/common';
import { FacilitiesController } from './controller';
import { PrismaModule } from 'src/providers/prisma/prisma.module';
import { FacilitiesService } from './service';

@Module({
  imports: [PrismaModule],
  controllers: [FacilitiesController],
  providers: [FacilitiesService],
  exports: [FacilitiesService],
})
export class FacilitiesModule {}