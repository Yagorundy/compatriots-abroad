import { HttpService, Injectable } from "@nestjs/common";
import { GeocodingResponse } from "./interfaces/geocoding-response.interface";

@Injectable()
export class GeocodingService {
    constructor(private httpService: HttpService) { }

    async getLocation(address: string) {
        const { data } = await this.httpService.get<GeocodingResponse>('/json', {
            params: { address }
        }).toPromise()
        const country = data.results[0].address_components.find(c => c.types.includes('country'))
        return { ...data, country: country.long_name, countryCode: country.short_name }
    }
}