import { ICreateUserDto } from "../../../../../common/transfer/create-user-dto.interface"

export class CreateUserDto implements ICreateUserDto {
    firstName: string
    lastName: string
    email: string
    password: string
    address: string
}
