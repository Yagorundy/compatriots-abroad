import { Controller, Get, Query } from '@nestjs/common'
import { GroupsService } from '../../core/groups/groups.service'
import { UsersService } from '../../core/users/users.service'
import { GetLocationsDto } from './get-locations-query.dto'

@Controller('locations')
export class LocationsController {
    constructor(private usersService: UsersService, private groupsService: GroupsService) {}

    @Get()
    async get(@Query() { target, countryOfOrigin }: GetLocationsDto) {
        switch (target) {
            case 'users': return await this.usersService.getUsersLocation(countryOfOrigin)
            case 'groups': return await this.groupsService.getGroupsLocation(countryOfOrigin)
        }
    }
}
