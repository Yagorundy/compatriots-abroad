import { Body, Controller, Get, Post, Req, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "../../core/auth/auth.service";
import { UserLoginDto } from "../../core/auth/dtos/user-login.dto";
import { User } from "../auth-module/user.decorator";
import { JwtGuard } from "../auth-module/jwt.guard";
import { IUser } from "../auth-module/user.interface";
import { IJwtDto } from "../../../../common/transfer/jwt-dto.interface";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    async login(@Body() dto: UserLoginDto): Promise<IJwtDto> {
        return await this.authService.login(dto)
    }

    @Get('test')
    @UseGuards(JwtGuard)
    async test(@User() user: IUser) {
        console.log(user.id)
    }
}
