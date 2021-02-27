import { AutoMap } from "@automapper/classes";
import { IMeilisearchGroup } from "../../../../../common/transfer/meilisearch/meilisearch-group-dto.interface";

export class MeilisearchGroupDto implements IMeilisearchGroup {
    @AutoMap()
    id: string

    @AutoMap()
    name: string

    @AutoMap()
    description: string

    @AutoMap()
    countryOfOrigin: string
}
