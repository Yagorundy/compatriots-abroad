import { IsString } from "class-validator";
import { IGroupUpdateDto } from "../../../../../common/transfer/groups/group-update-dto.interface";
import { IsCountryCode } from "../../validators/is-country-code";

export class GroupUpdateDto implements IGroupUpdateDto {
    @IsString()
    name: string

    @IsString()
    description: string

    @IsCountryCode()
    countryOfOrigin: string

    @IsString()
    address: string
}
