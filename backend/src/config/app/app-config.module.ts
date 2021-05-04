import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppConfigService } from './app-config.service'

@Module({
    providers: [AppConfigService],
    imports: [ConfigModule.forRoot({ envFilePath: ['../common/.env', '.env'] })],
    exports: [ConfigModule, AppConfigService]
})
export class AppConfigModule { }
