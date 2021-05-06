import { ICoordinatesDto } from "../../../../common/transfer/coordinates/coordinates-dto.interface"
import { ILocation } from "../../data/common/location.interface"

export interface IGeocodingService {
    getLocationByAddress(address: string): Promise<ILocation>
    getCountryCodeByCoordinates(coordinates: ICoordinatesDto): Promise<string>
}
