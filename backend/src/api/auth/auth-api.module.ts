import { Module } from "@nestjs/common";
import { AuthCoreModule } from "../../core/auth/auth-core.module";
import { AuthModule } from "../auth-module/auth.module";
import { AuthController } from "./auth.controller";

@Module({
    controllers: [AuthController],
    imports: [AuthModule, AuthCoreModule]
})
export class AuthApiModule { }
