import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/app/config.module';
import { TestingModule as Testing } from './testing/testing.module';

@Module({
  imports: [AppConfigModule, Testing],
})
export class AppModule { }
