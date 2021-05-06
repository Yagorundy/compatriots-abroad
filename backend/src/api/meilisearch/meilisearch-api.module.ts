import { Module } from '@nestjs/common'
import { MeilisearchModule } from '../../infrastructure/meilisearch/meilisearch.module';
import { MeilisearchController } from './meilisearch.controller';

@Module({
    controllers: [MeilisearchController],
    imports: [MeilisearchModule]
})
export class MeilisearchApiModule {}
