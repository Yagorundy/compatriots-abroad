import { Injectable } from "@nestjs/common";
import { compareSync } from "bcryptjs";
import { UserRepository } from "../../infrastructure/mongo/users/user.repository";
import { UserLoginDto } from "./dtos/user-login.dto";

@Injectable()
export class AuthService {
    constructor(private userRepository: UserRepository) { }

    async login(userLoginDto: UserLoginDto) {
        const identity = await this.userRepository.getIdentity(userLoginDto.email)
        if (!compareSync(userLoginDto.password, identity.passwordHash)) throw new Error('Invalid password')
        return 'Oo daa'
    }
}
