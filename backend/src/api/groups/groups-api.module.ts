import { Module } from "@nestjs/common";
import { GroupsCoreModule } from "../../core/groups/groups-core.module";
import { GroupsController } from "./groups.controller";

@Module({
    controllers: [GroupsController],
    imports: [GroupsCoreModule]
})
export class GroupsApiModule { }
