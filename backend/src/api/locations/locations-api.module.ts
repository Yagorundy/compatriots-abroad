import { Module } from '@nestjs/common'
import { LocationsController } from './locations.controller'
import { UsersCoreModule } from '../../core/users/users-core.module'
import { GroupsCoreModule } from '../../core/groups/groups-core.module'
import { GeocodingModule } from '../../infrastructure/geocoding/geocoding.module'

@Module({
    controllers: [LocationsController],
    imports: [UsersCoreModule, GroupsCoreModule, GeocodingModule]
})
export class LocationsApiModule {}
