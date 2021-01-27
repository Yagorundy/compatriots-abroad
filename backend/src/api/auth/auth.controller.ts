import { Body, Controller, Post } from "@nestjs/common";
import { IJwtResponseDto } from "../../../../common/transfer/auth/jwt-response-dto.interface";
import { AuthService } from "../../core/auth/auth.service";
import { UserLoginDto } from "../../core/auth/dtos/user-login.dto";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    async login(@Body() dto: UserLoginDto): Promise<IJwtResponseDto> {
        return await this.authService.login(dto)
    }
}
