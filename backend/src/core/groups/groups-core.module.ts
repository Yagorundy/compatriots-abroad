import { Module } from "@nestjs/common";
import { GroupRepositoryModule } from "../../infrastructure/mongo/groups/group-repository.module";
import { GroupsService } from "./groups.service";

@Module({
    providers: [GroupsService],
    imports: [GroupRepositoryModule],
    exports: [GroupsService]
})
export class GroupsCoreModule { }
