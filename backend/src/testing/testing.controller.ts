import { Controller, Get, Query } from "@nestjs/common";
import { GeocodingService } from "src/geocoding/geocoding.service";

@Controller()
export class TestingController {
    constructor (private geocodingService: GeocodingService) { }

    @Get('/geolocation')
    async getResponse(@Query('address') address: string) {
        return await this.geocodingService.getLocation(address);
    }
}