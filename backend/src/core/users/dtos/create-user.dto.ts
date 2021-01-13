import { IsEmail, IsString } from "class-validator"
import { ICreateUserDto } from "../../../../../common/transfer/create-user-dto.interface"

export class CreateUserDto implements ICreateUserDto {
    @IsString()
    firstName: string

    @IsString()
    lastName: string

    @IsEmail()
    email: string

    @IsString()
    password: string

    @IsString()
    address: string
}
