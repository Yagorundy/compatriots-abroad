import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common'
import { UserCreateDto } from '../../core/users/dtos/user-create.dto'
import { UsersService } from '../../core/users/users.service'
import { JwtGuard } from '../auth-module/jwt.guard'
import { User } from '../auth-module/user.decorator'
import { IUser } from '../auth-module/user.interface'

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post()
    async create(@Body() dto: UserCreateDto) {
        await this.usersService.createUser(dto)
    }

    @Get(':id')
    async get(@Param('id') id: string) {
        console.log(id);
        // TODO
    }

    @Delete()
    @UseGuards(JwtGuard)
    async delete(@User() user: IUser) {
        console.log('DELETE user ' + user.id);
        // TODO
    }
}
