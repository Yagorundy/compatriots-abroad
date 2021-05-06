import { Group, GroupSchema } from "../../../database/mongo/schemas/group.schema";
import { getMongoFakeRepo } from "../repository.fake";
import { GroupRepository } from "./group.repository";

export const getMongoFakeGroupRepo = () => getMongoFakeRepo(GroupRepository, GroupSchema, Group.name)
