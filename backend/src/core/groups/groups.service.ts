import { Injectable } from "@nestjs/common";
import { IGroup } from "../../data/mongo/group.interface";
import { GroupRepository } from "../../infrastructure/mongo/groups/group.repository";

@Injectable()
export class GroupsService {
    constructor(private groupRepository: GroupRepository) { }

    async create(group: IGroup) {
        await this.groupRepository.create(group);
    }

    async getGroupsLocation(countryOfOriginCode: string) {
        // TODO
    }
}
