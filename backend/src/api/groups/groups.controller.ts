import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { GroupCreateDto } from "../../core/groups/dtos/group-create.dto";
import { GroupsService } from "../../core/groups/groups.service";
import { JwtGuard } from "../auth-module/jwt.guard";
import { User } from "../auth-module/user.decorator";
import { IUser } from "../auth-module/user.interface";

@Controller('groups')
export class GroupsController {
    constructor(private groupsService: GroupsService) { }

    @Post()
    @UseGuards(JwtGuard)
    async create(@User() user: IUser, @Body() dto: GroupCreateDto) {
        await this.groupsService.createGroup(user.id, dto)
    }

    @Get(':id')
    @UseGuards(JwtGuard)
    async getGroup(@Param('id') id: string) {
        return await this.groupsService.getGroup(id)
    }

    @Get()
    @UseGuards(JwtGuard)
    async getGroupsForUser(@User() user: IUser) {
        return await this.groupsService.getGroupsForUser(user.id)
    }

    @Delete(':id')
    @UseGuards(JwtGuard)
    async deleteGroup(@Param('id') id: string, @User() user: IUser) {
        await this.groupsService.deleteGroup(id, user.id)
    }
}
