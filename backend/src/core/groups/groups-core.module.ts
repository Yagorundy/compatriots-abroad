import { Module } from "@nestjs/common";
import { GeocodingModule } from "../../infrastructure/geocoding/geocoding.module";
import { GroupRepositoryModule } from "../../infrastructure/mongo/groups/group-repository.module";
import { GroupsService } from "./groups.service";

@Module({
    providers: [GroupsService],
    imports: [GroupRepositoryModule, GeocodingModule],
    exports: [GroupsService]
})
export class GroupsCoreModule { }
