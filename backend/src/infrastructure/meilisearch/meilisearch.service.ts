import { Injectable } from '@nestjs/common'
import { IGroup } from '../../data/mongo/group.interface'
import { MeilisearchClientService } from '../../database/meilisearch/meilisearch-client.service'
@Injectable()
export class MeilisearchService {
    constructor(private meilisearchClientService: MeilisearchClientService) {}

    async getPublicKey() {
        const keys = await this.meilisearchClientService.getKeys()
        return keys.public
    }
}
