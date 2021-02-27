import { IUserPublicDto } from "../users/user-public-dto.interface";

export interface IJwtPayload extends IUserPublicDto {
    sub: string
}
