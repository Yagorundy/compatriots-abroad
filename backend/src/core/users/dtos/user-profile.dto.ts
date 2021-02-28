import { IsEmail, IsString } from "class-validator";
import { IUserProfileDto } from "../../../../../common/transfer/users/user-profile-dto.interface";
import { IsCountryCode } from "../../validators/is-country-code";

export class UserProfileDto implements IUserProfileDto {
    @IsString()
    id: string

    @IsString()
    firstName: string

    @IsString()
    lastName: string

    @IsCountryCode()
    countryOfOrigin: string

    @IsString()
    address: string

    @IsEmail()
    email: string
}
