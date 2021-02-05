import { HttpService, Injectable } from '@nestjs/common'
import { Geocoding } from './geocoding.namespace'

@Injectable()
export class GeocodingService {
    constructor(private httpService: HttpService) {}

    async getLocation(address: string) {
        const { data } = await this.httpService
            .get<Geocoding.Response>('/json', {
                params: { address }
            })
            .toPromise()

        if (data.status === 'ZERO_RESULTS') throw new Error('Could not find location')
        const result = data.results[0]

        const country = result.address_components.find(c => c.types.includes('country'))
        const coords = result.geometry.location;

        return {
            countryCode: country.short_name,
            lat: coords.lat,
            lng: coords.lng
        }
    }
}
