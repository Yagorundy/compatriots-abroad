import { Injectable } from '@nestjs/common'
import { Config } from 'meilisearch'
import { MEILISEARCH_GROUPS_INDEX } from '../../../../common/constants/meilisearch.constants'
import { IMeilisearchGroup } from '../../../../common/transfer/meilisearch/meilisearch-group-dto.interface'
import { MeilisearchClientService } from '../../database/meilisearch/meilisearch-client.service'

@Injectable()
export class MeilisearchService {
    constructor(private meilisearchClientService: MeilisearchClientService) {}

    async getPublicConfig(): Promise<Config> {
        const keys = await this.meilisearchClientService.getKeys()
        return {
            host: this.meilisearchClientService.config.host,
            apiKey: keys.public
        }
    }

    private getGroupsIndex() {
        return this.meilisearchClientService.index(MEILISEARCH_GROUPS_INDEX);
    }

    async addGroup(group: IMeilisearchGroup) {
        const index = this.getGroupsIndex()
        const update = await index.addDocuments([group])
        await index.waitForPendingUpdate(update.updateId)
    }

    async deleteGroup(id: string) {
        const index = this.getGroupsIndex()
        const update = await index.deleteDocument(id)
        await index.waitForPendingUpdate(update.updateId)
    }
}
