import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { IJwtPayload } from '../../../../common/transfer/auth/jwt-payload.interface';
import { IUser } from './user.interface';
import { UsersService } from '../../core/users/users.service';
import { JwtConfigService } from '../../config/jwt/jwt-config.service';
import { AuthenticationError } from '../../../../common/errors/authentication.error';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    private usersService: UsersService

    constructor(jwtConfigService: JwtConfigService, usersService: UsersService) {
        const opts = jwtConfigService.createJwtOptions()
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: opts.secret,
            jsonWebTokenOptions: opts.verifyOptions
        } as StrategyOptions)
        this.usersService = usersService
    }

    async validate(payload: IJwtPayload): Promise<IUser> {
        const user: IUser = { id: payload.sub }
        if (!await this.usersService.checkUser(user.id)) throw new AuthenticationError('User doesn\'t exist!')
        return user
    }
}
