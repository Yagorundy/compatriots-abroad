import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModuleOptions } from "@nestjs/jwt";
import { IJwtConfigService } from "./jwt-config.service.contract";

@Injectable()
export class JwtConfigService implements IJwtConfigService {
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
