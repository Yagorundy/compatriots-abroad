import { Module } from "@nestjs/common";
import { GeocodingModule } from "../../infrastructure/geocoding/geocoding.module";
import { MeilisearchModule } from "../../infrastructure/meilisearch/meilisearch.module";
import { GroupRepositoryModule } from "../../infrastructure/mongo/groups/group-repository.module";
import { UserRepositoryModule } from "../../infrastructure/mongo/users/user-repository.module";
import { GroupsService } from "./groups.service";

@Module({
    providers: [GroupsService],
    imports: [GroupRepositoryModule, UserRepositoryModule, GeocodingModule, MeilisearchModule],
    exports: [GroupsService]
})
export class GroupsCoreModule { }
