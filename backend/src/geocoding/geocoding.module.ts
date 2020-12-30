import { HttpModule, Module } from "@nestjs/common";
import { GeocodingConfigModule } from "src/config/geocoding/config.module";
import { GeocodingConfigService } from "src/config/geocoding/config.service";
import { GeocodingService } from "./geocoding.service";

@Module({
    imports: [HttpModule.registerAsync({
        imports: [GeocodingConfigModule],
        useClass: GeocodingConfigService
    })],
    exports: [HttpModule],
    providers: [GeocodingService]
})
export class GeocodingModule { }