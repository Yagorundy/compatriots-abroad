import { JwtModuleOptions } from "@nestjs/jwt";
import { IJwtConfigService } from "./jwt-config.service.contract";

export class JwtConfigServiceFake implements IJwtConfigService {
    get secret() {
        return 'jwt-secret'
    }

    createJwtOptions(): JwtModuleOptions {
        return {
            secret: this.secret
        }
    }
}
