import { Type } from "class-transformer";
import { IsNumber } from "class-validator";
import { ILocationDto } from "../../../../common/transfer/locations/location-dto.interface";

export class LocationDto implements ILocationDto {
    @IsNumber()
    @Type(() => Number)
    lat: number

    @IsNumber()
    @Type(() => Number)
    lng: number
}
