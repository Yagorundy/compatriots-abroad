import { Module } from '@nestjs/common'
import { UsersCoreModule } from '../../core/users/users-core.module'
import { UsersController } from './users.controller'

@Module({
    controllers: [UsersController],
    imports: [UsersCoreModule]
})
export class UsersApiModule {}
