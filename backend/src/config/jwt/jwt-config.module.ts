import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';

@Injectable()
export class JwtConfigService implements JwtOptionsFactory {
    constructor(private configService: ConfigService) { }

    get secret() {
        return this.configService.get<string>('JWT_SECRET')
    }

    createJwtOptions(): JwtModuleOptions {
        return {
            secret: this.secret,
            signOptions: {
                // TODO
            },
            verifyOptions: {
                // TODO
            }
        }
    }
}
