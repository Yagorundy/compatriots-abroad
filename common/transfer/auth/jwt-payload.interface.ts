import { IUserPublic } from "../users/user-public.interface";

export interface IJwtPayload extends IUserPublic {
    sub: string
}
