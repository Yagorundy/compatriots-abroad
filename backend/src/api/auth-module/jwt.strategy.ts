import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JwtConfigService } from '../../config/jwt/jwt-config.module';
import { IJwtPayload } from '../../core/auth/interfaces/jwt-payload';
import { IUser } from './user.interface';
import { UsersService } from '../../core/users/users.service';
import { AuthorizationError } from '../../../../common/errors/authorization.error';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    usersService: UsersService;
    constructor(jwtConfigService: JwtConfigService, usersService: UsersService) {
        const opts = jwtConfigService.createJwtOptions()
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: opts.secret,
            jsonWebTokenOptions: opts.verifyOptions
        } as StrategyOptions);
        this.usersService = usersService;
    }

    async validate(payload: IJwtPayload): Promise<IUser> {
        const user: IUser = { id: payload.sub };
        if (!await this.usersService.checkUser(user.id))
            throw new AuthorizationError('Invalid user id');
        return user;
    }
}
