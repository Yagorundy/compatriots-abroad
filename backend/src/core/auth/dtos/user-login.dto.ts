import { IUserLoginDto } from "../../../../../common/transfer/user-login-dto.interface";

export class UserLoginDto implements IUserLoginDto {
    email: string
    password: string
}
