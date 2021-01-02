import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JwtConfigService } from '../../config/jwt/jwt-config.module';
import { IJwtPayload } from '../../core/auth/interfaces/jwt-payload';
import { IUser } from './user.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(jwtConfigService: JwtConfigService) {
        const opts = jwtConfigService.createJwtOptions()
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: opts.secret,
            jsonWebTokenOptions: opts.verifyOptions
        } as StrategyOptions);
    }

    validate(payload: IJwtPayload): IUser {
        return { id: payload.sub };
    }
}
