import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "../../../database/mongo/schemas/user.schema";
import { UserRepository } from "./user.repository";

@Module({
  providers: [UserRepository],
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  exports: [UserRepository]
})
export class UserRepositoryModule { }
