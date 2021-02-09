import { Module } from '@nestjs/common'
import { MeilisearchClientModule } from '../../database/meilisearch/meilisearch-client.module';
import { MeilisearchService } from './meilisearch.service';

@Module({
    providers: [MeilisearchService],
    imports: [MeilisearchClientModule],
    exports: [MeilisearchClientModule, MeilisearchService]
})
export class MeilisearchModule {}
