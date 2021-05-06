import { Config } from "meilisearch"
import { IMeilisearchGroup } from "../../../../common/transfer/meilisearch/meilisearch-group-dto.interface"
import { IMeilisearchService } from "./meilisearch.service.contract"

export class MeilisearchServiceFake implements IMeilisearchService {
    async getPublicConfig(): Promise<Config> {
        return {
            host: 'mock-host',
            apiKey: 'mock-api-key'
        }
    }

    private groups: { [id: string]: IMeilisearchGroup }

    async upsertGroup(group: IMeilisearchGroup) {
        this.groups[group.id] = group
    }

    async deleteGroup(id: string) {
        delete this.groups[id]
    }
}
