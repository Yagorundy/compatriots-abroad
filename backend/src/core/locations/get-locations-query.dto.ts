import { IGetLocationsDto } from "../../../../common/transfer/locations/get-locations-dto.interface"
import { GetLocationsTarget } from "../../../../common/transfer/locations/get-locations-target.type";
import { IsCountryCode } from "../validators/is-country-code";
import { IsLocationsTarget } from "../validators/is-locations-target";

export class GetLocationsDto implements IGetLocationsDto {
    @IsCountryCode()
    countryOfOrigin: string

    @IsLocationsTarget()
    target: GetLocationsTarget
}
