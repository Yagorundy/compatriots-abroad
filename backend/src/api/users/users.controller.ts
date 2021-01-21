import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common'
import { UserCreateDto } from '../../core/users/dtos/user-create.dto'
import { UsersService } from '../../core/users/users.service'
import { JwtGuard } from '../auth-module/jwt.guard'
import { User } from '../auth-module/user.decorator'
import { IUser } from '../auth-module/user.interface'

@Controller()
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post('users')
    async create(@Body() dto: UserCreateDto) {
        await this.usersService.createUser(dto)
    }

    @Get('users')
    async get(@Param() id: string) {
        // TODO
    }

    @Delete('user')
    @UseGuards(JwtGuard)
    async delete(@User() user: IUser) {
        console.log('DELETE user ' + user.id);
        // TODO
    }
}
