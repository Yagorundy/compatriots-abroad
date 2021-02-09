import { Controller, Get } from '@nestjs/common'
import { MeilisearchService } from '../../infrastructure/meilisearch/meilisearch.service'

@Controller('meilisearch')
export class MeilisearchController {
    constructor(private meilisearchService: MeilisearchService) {}

    @Get('public-key')
    async getPublicKey() {
        return await this.meilisearchService.getPublicKey()
    }
}
