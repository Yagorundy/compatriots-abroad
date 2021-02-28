import { HttpService, Injectable } from '@nestjs/common'
import { AppError } from '../../../../common/errors/app.error'
import { ILocationDto } from '../../../../common/transfer/locations/location-dto.interface'
import { IAddress } from '../../data/common/address.interface'
import { Geocoding } from '../../data/geocoding/geocoding.namespace'

interface GeocodeParams {
    address?: string
    latlng?: string
}

@Injectable()
export class GeocodingService {
    constructor(private httpService: HttpService) {}

    private async _getLocation(params: GeocodeParams): Promise<Omit<IAddress, 'address'>> {
        const { data } = await this.httpService.get<Geocoding.Response>('/json', { params }).toPromise()
        if (data.status === 'ZERO_RESULTS') throw new AppError('Could not find location')

        const result = data.results[0]
        const country = result.address_components.find(c => c.types.includes('country'))
        const coords = result.geometry.location;

        return {
            country: country.short_name,
            lat: coords.lat,
            lng: coords.lng
        }
    }

    async getLocationByAddress(address: string) {
        return await this._getLocation({ address })
    }

    async getCountryCodeByLocation(location: ILocationDto): Promise<string> {
        const result = await this._getLocation({ latlng: `${location.lat},${location.lng}` })
        return result.country
    }
}
