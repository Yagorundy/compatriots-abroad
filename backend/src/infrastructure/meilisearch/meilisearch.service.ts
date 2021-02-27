import { Injectable } from '@nestjs/common'
import { MEILISEARCH_GROUPS_INDEX } from '../../../../common/constants/meilisearch.constants'
import { IMeilisearchGroup } from '../../../../common/transfer/meilisearch/meilisearch-group-dto.interface'
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

    async addGroup(group: IMeilisearchGroup) {
        const index = await this.getGroupsIndex()
        const update = await index.addDocuments([group])
        await index.waitForPendingUpdate(update.updateId)
    }

    async deleteGroup(id: string) {
        const index = await this.getGroupsIndex()
        const update = await index.deleteDocument(id)
        await index.waitForPendingUpdate(update.updateId)
    }
}
