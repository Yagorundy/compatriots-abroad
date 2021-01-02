import { Module } from "@nestjs/common";
import { UserRepositoryModule } from "../../infrastructure/mongo/users/user-repository.module";
import { AuthService } from "./auth.service";

@Module({
    providers: [AuthService],
    imports: [UserRepositoryModule],
    exports: [AuthService]
})
export class AuthCoreModule { }
