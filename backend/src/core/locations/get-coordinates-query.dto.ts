import { IGetCoordinatesDto } from "../../../../common/transfer/coordinates/get-coordinates-dto.interface"
import { GetCoordinatesTarget } from "../../../../common/transfer/coordinates/get-coordinates-target.type"
import { IsCountryCode } from "../validators/is-country-code"
import { IsCoordinatesTarget } from "../validators/is-coordinates-target"

export class GetCoordinatesDto implements IGetCoordinatesDto {
    @IsCountryCode()
    countryOfOrigin: string

    @IsCoordinatesTarget()
    target: GetCoordinatesTarget
}
