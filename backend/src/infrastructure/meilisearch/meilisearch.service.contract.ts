import { Config } from "meilisearch";
import { IMeilisearchGroup } from "../../../../common/transfer/meilisearch/meilisearch-group-dto.interface";

export interface IMeilisearchService {
    getPublicConfig(): Promise<Config>

    upsertGroup(group: IMeilisearchGroup): Promise<void>
    deleteGroup(id: string): Promise<void>
}
