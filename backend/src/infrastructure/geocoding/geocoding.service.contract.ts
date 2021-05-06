import { ICoordinatesDto } from "../../../../common/transfer/coordinates/coordinates-dto.interface"
import { IGetCountryByCoordinatesDto } from "../../../../common/transfer/coordinates/get-country-by-coordinates-dto.interface"
import { ILocation } from "../../data/common/location.interface"

export interface IGeocodingService {
    getLocationByAddress(address: string): Promise<ILocation>
    getCountryByCoordinates(coordinates: ICoordinatesDto): Promise<IGetCountryByCoordinatesDto>
}
