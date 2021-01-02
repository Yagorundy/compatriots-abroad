import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtConfigModule } from "../../config/jwt/jwt-config.service";
import { JwtStrategy } from "./jwt.strategy";

@Module({
    providers: [JwtStrategy],
    imports: [JwtConfigModule, PassportModule]
})
export class AuthModule { }
