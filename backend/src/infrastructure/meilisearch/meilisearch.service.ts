import { Injectable } from '@nestjs/common'
import { MeilisearchClientService } from '../../database/meilisearch/meilisearch-client.service'


@Injectable()
export class MeilisearchService {
    constructor(private meilisearchClientService: MeilisearchClientService) {}

    async getPublicKey() {
        // TODO: uncomment when meili js is fixed
        // const keys = await this.meilisearchClientService.getKeys()
        // return keys.public
        return await this.meilisearchClientService.listIndexes()
    }
}
