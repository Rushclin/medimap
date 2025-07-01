import { Module } from '@nestjs/common';
import { UsersModule } from '../users/module';
import { AuthController } from './controler';
import { AuthService } from './service';
import { PassportModule } from '@nestjs/passport';
import { TokensModule } from 'src/providers/tokens/tokens.module';
import { PrismaModule } from 'src/providers/prisma/prisma.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    UsersModule,
    TokensModule,
    PrismaModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
