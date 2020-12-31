import { Module } from "@nestjs/common";
import { UserRepositoryModule } from "../../infrastructure/mongo/users/user-repository.module";
import { UsersService } from "./users.service";

@Module({
  providers: [UsersService],
  imports: [UserRepositoryModule],
  exports: [UsersService]
})
export class UsersCoreModule { }
