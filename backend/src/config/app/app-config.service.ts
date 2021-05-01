import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AppConfigService {
    constructor(private configService: ConfigService) {}

    get port() {
        return this.configService.get<number>('BACKEND_PORT')
    }

    get prefix() {
        return this.configService.get<string>('PREFIX', '/api')
    }

    get allowedOrigin() {
        return this.configService.get<string>('ALLOWED_ORIGIN')
    }
}
