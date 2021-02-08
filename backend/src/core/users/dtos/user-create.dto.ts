import { IsEmail, IsString } from "class-validator"
import { IUserCreateDto } from "../../../../../common/transfer/users/user-create-dto.interface"
import { IsCountryCode } from "../../validators/is-country-code"

export class UserCreateDto implements IUserCreateDto {
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

    @IsString()
    password: string
}
