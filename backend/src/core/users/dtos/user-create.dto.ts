import { AutoMap } from "@automapper/classes"
import { IsEmail, IsString } from "class-validator"
import { IUserCreateDto } from "../../../../../common/transfer/users/user-create-dto.interface"
import { IsCountryCode } from "../../validators/is-country-code"

export class UserCreateDto implements IUserCreateDto {
    @IsString()
    @AutoMap()
    firstName: string

    @IsString()
    @AutoMap()
    lastName: string

    @IsCountryCode()
    @AutoMap()
    countryOfOrigin: string

    @IsString()
    @AutoMap()
    address: string

    @IsEmail()
    @AutoMap()
    email: string

    @IsString()
    @AutoMap()
    password: string
}
