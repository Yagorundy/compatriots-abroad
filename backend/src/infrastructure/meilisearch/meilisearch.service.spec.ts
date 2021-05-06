import { MeilisearchService } from "./meilisearch.service";
import { IMeilisearchService } from "./meilisearch.service.contract";
import { MeilisearchServiceFake } from "./meilisearch.service.fake";

describe(MeilisearchService.name, () => {
    let service: IMeilisearchService

    beforeEach(() => {
        service = new MeilisearchServiceFake();
    })

    it('should be defined', () => {
        expect(service).toBeDefined()
    })
})
