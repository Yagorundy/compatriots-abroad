import { IsEmail, IsString } from "class-validator";
import { IUserDto } from "../../../../../common/transfer/users/user-dto.interface";
import { IsCountryCode } from "../../validators/is-country-code";

export class UserDto implements IUserDto {
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
