import { MEILISEARCH_GROUPS_INDEX } from "../../../../../common/constants/meilisearch.constants";
import { IMeilisearchGroup } from "../../../../../common/transfer/meilisearch/meilisearch-group-dto.interface";
import { getMeilisearchClient } from "../../../helpers/migration.helper";

export async function up() {
    const client = await getMeilisearchClient()
    const index = await client.getOrCreateIndex(MEILISEARCH_GROUPS_INDEX, { primaryKey: 'id' as keyof IMeilisearchGroup })
    await index.updateSettings({
        searchableAttributes: ['name', 'description'] as (keyof IMeilisearchGroup)[],
        attributesForFaceting: ['countryOfOrigin'] as (keyof IMeilisearchGroup)[]
    })
}

export async function down() {
    const client = await getMeilisearchClient()
    await client.deleteIndex(MEILISEARCH_GROUPS_INDEX)
}
