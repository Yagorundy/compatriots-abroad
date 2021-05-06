import { HttpService, Injectable } from '@nestjs/common'
import { AppError } from '../../../../common/errors/app.error'
import { ICoordinatesDto } from '../../../../common/transfer/coordinates/coordinates-dto.interface'
import { ILocation } from '../../data/common/location.interface'
import { Geocoding } from '../../data/geocoding/geocoding.namespace'
import { IGeocodingService } from './geocoding.service.contract'

interface GeocodeParams {
    address?: string
    latlng?: string
}

@Injectable()
export class GeocodingService implements IGeocodingService {
    constructor(private httpService: HttpService) {}

    private async _getLocation(params: GeocodeParams): Promise<ILocation> {
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

    async getCountryCodeByCoordinates(coordinates: ICoordinatesDto): Promise<string> {
        const result = await this._getLocation({ latlng: `${coordinates.lat},${coordinates.lng}` })
        return result.country
    }
}
