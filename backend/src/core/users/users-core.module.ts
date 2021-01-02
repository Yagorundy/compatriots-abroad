import { Module } from '@nestjs/common'
import { GeocodingModule } from '../../infrastructure/geocoding/geocoding.module'
import { UserRepositoryModule } from '../../infrastructure/mongo/users/user-repository.module'
import { UsersService } from './users.service'

@Module({
    providers: [UsersService],
    imports: [UserRepositoryModule, GeocodingModule],
    exports: [UsersService]
})
export class UsersCoreModule {}
