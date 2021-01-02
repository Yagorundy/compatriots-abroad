import { Module } from "@nestjs/common";
import { JwtModule } from '@nestjs/jwt';
import { JwtConfigService } from "../../config/jwt/jwt-config.module";
import { JwtConfigModule } from "../../config/jwt/jwt-config.service";
import { UserRepositoryModule } from "../../infrastructure/mongo/users/user-repository.module";
import { AuthService } from "./auth.service";

@Module({
    providers: [AuthService],
    imports: [
        UserRepositoryModule,
        JwtModule.registerAsync({
            imports: [JwtConfigModule],
            useClass: JwtConfigService
        })
    ],
    exports: [AuthService]
})
export class AuthCoreModule { }
