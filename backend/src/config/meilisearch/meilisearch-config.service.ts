import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class MeilisearchConfigService {
    constructor(private configService: ConfigService) { }

    get url() {
        return this.configService.get<string>('MEILISEARCH_URL')
    }

    get masterKey() {
        return this.configService.get<string>('MEILISEARCH_MASTER_KEY')
    }
}
