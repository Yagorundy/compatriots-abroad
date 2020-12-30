import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GeocodingConfigService } from "./config.service";

@Module({
    imports: [ConfigModule.forRoot()],
    exports: [ConfigModule],
    providers: [GeocodingConfigService]
})
export class GeocodingConfigModule { }