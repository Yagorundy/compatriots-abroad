import { IsString } from "class-validator";
import { IGroupCreateDto } from "../../../../../common/transfer/groups/group-create-dto.interface";
import { IsCountryCode } from "../../validators/is-country-code";

export class GroupCreateDto implements IGroupCreateDto {
    @IsString()
    name: string

    @IsString()
    description: string

    @IsCountryCode()
    countryOfOrigin: string

    @IsString()
    address: string
}
