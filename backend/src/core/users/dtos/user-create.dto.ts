import { IsEmail, IsString } from "class-validator"
import { IUserCreateDto } from "../../../../../common/transfer/users/user-create-dto.interface"

export class UserCreateDto implements IUserCreateDto {
    @IsString()
    firstName: string

    @IsString()
    lastName: string

    @IsString()
    address: string

    @IsEmail()
    email: string

    @IsString()
    password: string
}
