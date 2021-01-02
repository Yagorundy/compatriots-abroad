import { Injectable } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { compareSync } from "bcryptjs";
import { InvalidLoginError } from "../../../../common/errors/auth/invalid-login.error";
import { IJwtDto } from "../../../../common/transfer/jwt-dto.interface";
import { IUserIdentity } from "../../infrastructure/mongo/users/interfaces/user-identity.interface";
import { UserRepository } from "../../infrastructure/mongo/users/user.repository";
import { UserLoginDto } from "./dtos/user-login.dto";
import { IJwtPayload } from "./interfaces/jwt-payload";

@Injectable()
export class AuthService {
    constructor(private userRepository: UserRepository, private jwtService: JwtService) { }

    async login(userLoginDto: UserLoginDto): Promise<IJwtDto> {
        try {
            const identity = await this.userRepository.getIdentity(userLoginDto.email)
            if (!compareSync(userLoginDto.password, identity.passwordHash)) throw new Error('Invalid password!')
            return this.createJwtResponse(identity);
        } catch (err) {
            throw new InvalidLoginError(`Wrong email or password!`, err)
        }
    }

    private createJwtResponse(identity: IUserIdentity): IJwtDto {
        return {
            access_token: this.signToken(identity)
        }
    }

    private signToken(identity: IUserIdentity) {
        return this.jwtService.sign({
            sub: identity.id
        } as IJwtPayload);
    }
}
