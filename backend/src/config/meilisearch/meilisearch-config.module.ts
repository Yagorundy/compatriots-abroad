import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MeilisearchConfigService } from "./meilisearch-config.service";

@Module({
    providers: [MeilisearchConfigService],
    imports: [ConfigModule.forRoot()],
    exports: [ConfigModule, MeilisearchConfigService]
})
export class MeilisearchConfigModule { }
