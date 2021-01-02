import { Module } from "@nestjs/common";
import { AuthCoreModule } from "../../core/auth/auth-core.module";
import { AuthController } from "./auth.controller";

@Module({
    controllers: [AuthController],
    imports: [AuthCoreModule]
})
export class AuthApiModule { }
