import { Injectable } from '@nestjs/common'
import { MeiliSearch } from 'meilisearch'
import { MeilisearchConfigService } from '../../config/meilisearch/meilisearch-config.service'

@Injectable()
export class MeilisearchClientService extends MeiliSearch {
    constructor(meilisearchConfigService: MeilisearchConfigService) {
        super({
            host: meilisearchConfigService.url,
            apiKey: meilisearchConfigService.masterKey
        })
    }
}
