import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongoConfigService } from './mongo-config.service'

@Module({
    providers: [MongoConfigService],
    imports: [ConfigModule.forRoot({ expandVariables: true })],
    exports: [ConfigModule, MongoConfigService]
})
export class MongoConfigModule {}
