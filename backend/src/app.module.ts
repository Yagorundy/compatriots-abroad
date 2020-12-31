import { Module } from '@nestjs/common';
import { UsersApiModule } from './api/users/users-api.module';
import { AppConfigModule } from './config/app/app-config.module';
import { MongoModule } from './database/mongo/mongo.module';

@Module({
  imports: [AppConfigModule, MongoModule, UsersApiModule],
})
export class AppModule { }
