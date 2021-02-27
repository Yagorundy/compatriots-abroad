import { Controller, Get } from '@nestjs/common'
import { MeilisearchService } from '../../infrastructure/meilisearch/meilisearch.service'

@Controller('meilisearch')
export class MeilisearchController {
    constructor(private meilisearchService: MeilisearchService) {}

    @Get('config')
    async getConfig() {
        return await this.meilisearchService.getPublicConfig()
    }
}
