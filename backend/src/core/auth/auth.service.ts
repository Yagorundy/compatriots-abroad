import { Injectable } from "@nestjs/common";
import { compareSync } from "bcryptjs";
import { InvalidLoginError } from "../../../../common/errors/auth/invalid-login.error";
import { UserRepository } from "../../infrastructure/mongo/users/user.repository";
import { UserLoginDto } from "./dtos/user-login.dto";

@Injectable()
export class AuthService {
    constructor(private userRepository: UserRepository) { }

    async login(userLoginDto: UserLoginDto) {
        try {
            const identity = await this.userRepository.getIdentity(userLoginDto.email)
            if (!compareSync(userLoginDto.password, identity.passwordHash)) throw new Error('Invalid password!')
        } catch (err) {
            throw new InvalidLoginError(`Wrong email or password!`, err)
        }
        return 'Oo daa'
    }
}
