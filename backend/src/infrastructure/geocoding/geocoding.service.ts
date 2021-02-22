import { HttpService, Injectable } from '@nestjs/common'
import { AppError } from '../../../../common/errors/app.error'
import { ILocation } from '../../../../common/transfer/locations/location.interface'
import { GeocodingResponse } from '../../data/geocoding/geocoding-response.interface'

interface GeocodeParams {
    address?: string
    latlng?: string
}

@Injectable()
export class GeocodingService {
    constructor(private httpService: HttpService) {}

    private async _getLocation(params: GeocodeParams): Promise<ILocation & { countryCode: string }> {
        const { data } = await this.httpService.get<GeocodingResponse>('/json', { params }).toPromise()
        if (data.status === 'ZERO_RESULTS') throw new AppError('Could not find location')

        const result = data.results[0]
        const country = result.address_components.find(c => c.types.includes('country'))
        const coords = result.geometry.location;

        return {
            countryCode: country.short_name,
            lat: coords.lat,
            lng: coords.lng
        }
    }

    async getLocationByAddress(address: string) {
        return await this._getLocation({ address })
    }

    async getCountryCodeByLocation(location: ILocation): Promise<string> {
        const result = await this._getLocation({ latlng: `${location.lat},${location.lng}` })
        return result.countryCode
    }
}
