import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common'
import { UserCreateDto } from '../../core/users/dtos/user-create.dto'
import { UserProfileDto } from '../../core/users/dtos/user-profile.dto'
import { UsersService } from '../../core/users/users.service'
import { JwtGuard } from '../auth-module/jwt.guard'
import { User } from '../auth-module/user.decorator'
import { IUser } from '../auth-module/user.interface'

@Controller('user')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post()
    async create(@Body() dto: UserCreateDto) {
        await this.usersService.createUser(dto)
    }

    @Get()
    @UseGuards(JwtGuard)
    async get(@User() user: IUser) {
        return await this.usersService.getUserProfile(user.id)
    }

    @Put()
    @UseGuards(JwtGuard)
    async update(@User() user: IUser, @Body() dto: UserProfileDto) {
        return await this.usersService.updateUserProfile(user.id, dto)
    }

    @Delete()
    @UseGuards(JwtGuard)
    async delete(@User() user: IUser) {
        console.log('DELETE user ' + user.id)
        // TODO
    }
}
