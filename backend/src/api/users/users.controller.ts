import { Body, Controller, Post } from '@nestjs/common'
import { CreateUserDto } from '../../core/users/dtos/create-user.dto'
import { UsersService } from '../../core/users/users.service'

@Controller('/users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post()
    async createUser(@Body() dto: CreateUserDto) {
        await this.usersService.createUser(dto)
        return 'Yea'
    }
}
