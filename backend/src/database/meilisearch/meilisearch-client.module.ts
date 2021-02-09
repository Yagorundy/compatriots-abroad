import { Module } from '@nestjs/common'
import { MeilisearchConfigModule } from '../../config/meilisearch/meilisearch-config.module';
import { MeilisearchClientService } from './meilisearch-client.service';

@Module({
    providers: [MeilisearchClientService],
    imports: [MeilisearchConfigModule],
    exports: [MeilisearchConfigModule, MeilisearchClientService]
})
export class MeilisearchClientModule {}
