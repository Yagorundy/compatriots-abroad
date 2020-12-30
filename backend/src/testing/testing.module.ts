import { Module } from "@nestjs/common";
import { GeocodingModule } from "src/geocoding/geocoding.module";
import { GeocodingService } from "src/geocoding/geocoding.service";
import { TestingController } from "./testing.controller";

@Module({
    controllers: [TestingController],
    imports: [GeocodingModule],
    providers: [GeocodingService]
})
export class TestingModule { }