import { User, UserSchema } from "../../../database/mongo/schemas/user.schema";
import { getMongoFakeRepo } from "../repository.fake";
import { UserRepository } from "./user.repository";

export const getMongoFakeUserRepo = () => getMongoFakeRepo(UserRepository, UserSchema, User.name)
