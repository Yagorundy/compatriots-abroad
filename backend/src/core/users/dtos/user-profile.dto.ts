import { IsEmail, IsString } from "class-validator";
import { IUserProfile } from "../../../../../common/transfer/users/user-profile.interface";
import { IsCountryCode } from "../../validators/is-country-code";

export class UserProfile implements IUserProfile {
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
