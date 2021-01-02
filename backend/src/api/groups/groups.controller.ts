import { Body, Controller, Post } from "@nestjs/common";
import { CreateGroupDto } from "../../core/groups/dtos/create-group.dto";
import { GroupsService } from "../../core/groups/groups.service";

@Controller('groups')
export class GroupsController {
    constructor(private groupsService: GroupsService) { }

    @Post()
    async create(@Body() dto: CreateGroupDto) {
        await this.groupsService.create(dto);
    }
}
