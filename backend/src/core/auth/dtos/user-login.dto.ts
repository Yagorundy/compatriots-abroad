import { IsEmail, IsString } from "class-validator"
import { IUserLoginDto } from "../../../../../common/transfer/auth/user-login-dto.interface"

export class UserLoginDto implements IUserLoginDto {
    @IsEmail()
    email: string

    @IsString()
    password: string
}
