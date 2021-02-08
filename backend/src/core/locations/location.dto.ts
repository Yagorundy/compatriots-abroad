import { IsNumber } from "class-validator";
import { ILocation } from "../../../../common/transfer/locations/location.interface";

export class LocationDto implements ILocation {
    @IsNumber()
    lat: number

    @IsNumber()
    lng: number
}
