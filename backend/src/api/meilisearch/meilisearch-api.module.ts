import { Module } from '@nestjs/common'
import { MeilisearchModule } from '../../infrastructure/meilisearch/meilisearch.module';
import { MeilisearchService } from '../../infrastructure/meilisearch/meilisearch.service';
import { MeilisearchController } from './meilisearch.controller';

@Module({
    controllers: [MeilisearchController],
    imports: [MeilisearchModule]
})
export class MeilisearchApiModule {}
