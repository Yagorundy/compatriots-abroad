import { HttpModuleOptions, HttpModuleOptionsFactory, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class GeocodingConfigService implements HttpModuleOptionsFactory {
    constructor(private configService: ConfigService) { }

    get apiKey() {
        return this.configService.get<string>('GOOGLE_GEOCODING_API_KEY')
    }

    createHttpOptions(): HttpModuleOptions {
        return {
            baseURL: 'https://maps.googleapis.com/maps/api/geocode',
            params: {
                key: this.apiKey
            }
        }
    }
}