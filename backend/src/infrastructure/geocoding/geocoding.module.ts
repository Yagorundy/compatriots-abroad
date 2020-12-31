import { HttpModule, Module } from '@nestjs/common'
import { GeocodingConfigModule } from '../../config/geocoding/geocoding-config.module'
import { GeocodingConfigService } from '../../config/geocoding/geocoding-config.service'
import { GeocodingService } from './geocoding.service'

@Module({
    providers: [GeocodingService],
    imports: [
        HttpModule.registerAsync({
            imports: [GeocodingConfigModule],
            useClass: GeocodingConfigService
        })
    ],
    exports: [GeocodingService]
})
export class GeocodingModule {}
