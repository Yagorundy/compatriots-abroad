import { Controller, Get, Query } from '@nestjs/common'
import { GroupsService } from '../../core/groups/groups.service'
import { GetLocationsDto } from '../../core/locations/get-locations-query.dto'
import { LocationDto } from '../../core/locations/location.dto'
import { UsersService } from '../../core/users/users.service'
import { GeocodingService } from '../../infrastructure/geocoding/geocoding.service'

@Controller()
export class LocationsController {
    constructor(
        private usersService: UsersService,
        private groupsService: GroupsService,
        private geocodingService: GeocodingService
    ) {}

    @Get('locations')
    async getLocations(@Query() { target, countryOfOrigin }: GetLocationsDto) {
        switch (target) {
            case 'users': return await this.usersService.getUserLocations(countryOfOrigin)
            case 'groups': return await this.groupsService.getGroupLocations(countryOfOrigin)
        }
    }

    @Get('country-code')
    async getCountryCode(@Query() location: LocationDto) {
        return await this.geocodingService.getCountryCodeByLocation(location)
    }
}
