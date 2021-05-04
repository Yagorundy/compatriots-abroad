import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AppConfigService {
    constructor(private configService: ConfigService) {}

    get host() {
        return this.configService.get<string>('HOST')
    }

    get port() {
        return this.configService.get<number>('BACKEND_PORT')
    }

    get prefix() {
        return this.configService.get<string>('BACKEND_PREFIX', '/api')
    }

    get allowedOrigin() {
        return this.configService.get<string>('FRONTEND_URL')
    }
}
