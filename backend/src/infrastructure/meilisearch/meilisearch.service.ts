import { Injectable } from '@nestjs/common'
import { MEILISEARCH_GROUPS_INDEX } from '../../../../common/constants/meilisearch.constants'
import { MeilisearchClientService } from '../../database/meilisearch/meilisearch-client.service'

@Injectable()
export class MeilisearchService {
    constructor(private meilisearchClientService: MeilisearchClientService) {}

    async getPublicKey() {
        const keys = await this.meilisearchClientService.getKeys()
        return keys.public
    }

    private async getGroupsIndex() {
        return await this.meilisearchClientService.getIndex(MEILISEARCH_GROUPS_INDEX);
    }

    async addGroup() {
        const index = await this.getGroupsIndex();
        // TODO(Yavorcho)
    }

    async removeGroup() {
        // TODO(Yavorcho)
    }
}
