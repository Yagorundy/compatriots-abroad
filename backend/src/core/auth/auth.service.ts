import { Injectable } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { compareSync } from "bcryptjs";
import { InvalidLoginError } from "../../../../common/errors/auth/invalid-login.error";
import { IJwtResponseDto } from "../../../../common/transfer/auth/jwt-response-dto.interface";
import { IUserPublic } from "../../../../common/transfer/users/user-public.interface";
import { IUserIdentity } from "../../infrastructure/mongo/users/interfaces/user-identity.interface";
import { UserRepository } from "../../infrastructure/mongo/users/user.repository";
import { UserLoginDto } from "./dtos/user-login.dto";
import { IJwtPayload } from "../../../../common/transfer/auth/jwt-payload.interface";

@Injectable()
export class AuthService {
    constructor(private userRepository: UserRepository, private jwtService: JwtService) { }

    async login(userLoginDto: UserLoginDto): Promise<IJwtResponseDto> {
        try {
            const identity = await this.userRepository.getIdentity(userLoginDto.email)
            if (!compareSync(userLoginDto.password, identity.passwordHash)) throw new Error('Invalid password!')
            const publicUser = await this.userRepository.getPublicUser(identity.id);
            return this.createJwtResponse(identity, publicUser);
        } catch (err) {
            throw new InvalidLoginError(`Wrong email or password!`, err)
        }
    }

    private createJwtResponse(identity: IUserIdentity, publicUser: IUserPublic): IJwtResponseDto {
        return {
            access_token: this.signToken(identity, publicUser)
        }
    }

    private signToken(identity: IUserIdentity, publicUser: IUserPublic) {
        return this.jwtService.sign({
            sub: identity.id,
            ...publicUser
        } as IJwtPayload);
    }
}
