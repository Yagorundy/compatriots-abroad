import { countries } from '../../../../common/constants/countries.constants';
import { ICoordinatesDto } from "../../../../common/transfer/coordinates/coordinates-dto.interface";
import { ILocation } from "../../data/common/location.interface";
import { IGeocodingService } from "./geocoding.service.contract";

export class GeocodingServiceFake implements IGeocodingService {
    async getLocationByAddress(address: string): Promise<ILocation> {
        return {
            country: countries[Math.floor(Math.random() * countries.length)].code,
            lat: Math.random() * 100,
            lng: Math.random() * 100
        }
    }

    async getCountryCodeByCoordinates(coordinates: ICoordinatesDto) {
        let smallestDiff = Number.MAX_SAFE_INTEGER,
            countryCode = '';
        countries.forEach(c => {
            const latDiff = Math.abs(coordinates.lat - c.lat)
            const lngDiff = Math.abs(coordinates.lng - c.lng)
            const diff = latDiff + lngDiff / 2;
            if (diff < smallestDiff) {
                smallestDiff = diff
                countryCode = c.code
            }
        })
        return countryCode
    }
}
