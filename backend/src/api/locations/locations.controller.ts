import { Controller, Get, Query } from '@nestjs/common'
import { GroupsService } from '../../core/groups/groups.service'
import { CoordinatesDto } from '../../core/locations/coordinates.dto'
import { GetCoordinatesDto } from '../../core/locations/get-coordinates-query.dto'
import { UsersService } from '../../core/users/users.service'
import { GeocodingService } from '../../infrastructure/geocoding/geocoding.service'

@Controller()
export class LocationsController {
    constructor(
        private usersService: UsersService,
        private groupsService: GroupsService,
        private geocodingService: GeocodingService
    ) {}

    @Get('coordinates')
    async getCoordinates(@Query() { target, countryOfOrigin }: GetCoordinatesDto) {
        switch (target) {
            case 'users': return await this.usersService.getUsersCoordinates(countryOfOrigin)
            case 'groups': return await this.groupsService.getGroupsCoordinates(countryOfOrigin)
        }
    }

    @Get('country')
    async getCountryCode(@Query() coordinates: CoordinatesDto) {
        return await this.geocodingService.getCountryByCoordinates(coordinates)
    }
}
