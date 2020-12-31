import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GeocodingConfigService } from './geocoding-config.service'

@Module({
    providers: [GeocodingConfigService],
    imports: [ConfigModule.forRoot()],
    exports: [GeocodingConfigService]
})
export class GeocodingConfigModule {}
