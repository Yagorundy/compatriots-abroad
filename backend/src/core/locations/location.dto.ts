import { Type } from "class-transformer";
import { IsNumber, IsNumberString } from "class-validator";
import { ILocation } from "../../../../common/transfer/locations/location.interface";

export class LocationDto implements ILocation {
    @IsNumber()
    @Type(() => Number)
    lat: number

    @IsNumber()
    @Type(() => Number)
    lng: number
}
