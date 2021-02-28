import { Type } from "class-transformer";
import { IsNumber } from "class-validator";
import { ICoordinatesDto } from "../../../../common/transfer/coordinates/coordinates-dto.interface";

export class CoordinatesDto implements ICoordinatesDto {
    @IsNumber()
    @Type(() => Number)
    lat: number

    @IsNumber()
    @Type(() => Number)
    lng: number
}
