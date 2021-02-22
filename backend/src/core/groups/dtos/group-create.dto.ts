import { IsString } from "class-validator";
import { IGroupDto } from "../../../../../common/transfer/groups/group-dto.interface";
import { IsCountryCode } from "../../validators/is-country-code";

export class GroupCreateDto implements IGroupDto {
    @IsString()
    name: string

    @IsString()
    description: string

    @IsCountryCode()
    countryOfOrigin: string

    @IsString()
    address: string
}
