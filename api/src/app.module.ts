import { Module } from '@nestjs/common';
// import { DocumentModule } from './modules/document/module';
// import { DomainModule } from './modules/domain/module';
// import { SubdomainModule } from './modules/subdomain/module';
import { UsersModule } from './modules/users/module';
import { AuthModule } from './modules/auth/module';
// import { UploadModule } from './modules/upload/upload.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { FacilitiesModule } from './modules/facilities/module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    // DocumentModule,
    // DomainModule,
    // SubdomainModule,
    UsersModule,
    AuthModule,
    FacilitiesModule,
    // UploadModule,
  ],
  // providers: [AppService],
})
export class AppModule {}
