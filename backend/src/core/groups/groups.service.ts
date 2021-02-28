import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/types";
import { Injectable } from "@nestjs/common";
import { AuthorizationError } from "../../../../common/errors/authorization.error";
import { IGetGroupsForUser } from "../../../../common/transfer/groups/get-groups-for-user-dto.interface";
import { IGroupCreateDto } from "../../../../common/transfer/groups/group-create-dto.interface";
import { IGroupDto } from "../../../../common/transfer/groups/group-dto.interface";
import { IGroupUpdateDto } from "../../../../common/transfer/groups/group-update-dto.interface";
import { GeocodingService } from "../../infrastructure/geocoding/geocoding.service";
import { MeilisearchService } from "../../infrastructure/meilisearch/meilisearch.service";
import { GroupRepository } from "../../infrastructure/mongo/groups/group.repository";
import { UserRepository } from "../../infrastructure/mongo/users/user.repository";
import { GroupSchemaDto } from "./dtos/group-schema.dto";
import { GroupDto } from "./dtos/group.dto";
import { MeilisearchGroupDto } from "./dtos/meilisearch-group.dto";

@Injectable()
export class GroupsService {
    constructor(
        private groupRepository: GroupRepository,
        private userRepository: UserRepository,
        private geocodingService: GeocodingService,
        private meilisearchService: MeilisearchService,
        @InjectMapper() private mapper: Mapper
    ) { }

    async createGroup(creatorId: string, groupCreateDto: IGroupCreateDto) {
        const location = await this.geocodingService.getLocationByAddress(groupCreateDto.address)
        const group = await this.groupRepository.createGroup(creatorId, {
            ...groupCreateDto,
            ...location
        })
        await this.meilisearchService.upsertGroup(this.mapper.map(group, MeilisearchGroupDto, GroupSchemaDto))
    }

    async getGroup(groupId: string, userId: string): Promise<IGroupDto> {
        const [group, likedGroups] = await Promise.all([
            this.groupRepository.getGroup(groupId),
            this.userRepository.getUserLikedGroups(userId)
        ])
        const isLiked = likedGroups.some(gid => gid === group.id)
        return this.mapper.map(group, GroupDto, GroupSchemaDto, { extraArguments: { isLiked } })
    }

    async getGroupsForUser(userId: string): Promise<IGetGroupsForUser> {
        const [myGroups] = await Promise.all([
            this.groupRepository.getGroupsForCreator(userId)
        ])
        return {
            myGroups,
            groupsILike: []
        }
    }

    async getGroupsCoordinates(countryOfOriginCode: string) {
        return await this.groupRepository.getGroupsCoordinates(countryOfOriginCode)
    }

    async updateGroup(groupId: string, updaterId: string, groupUpdateDto: IGroupUpdateDto) {
        const creatorId = await this.groupRepository.getGroupCreatorId(groupId)
        if (creatorId !== updaterId) throw new AuthorizationError('You cannot edit this group!')
        const location = await this.geocodingService.getLocationByAddress(groupUpdateDto.address)
        const updated = await this.groupRepository.updateGroup(groupId, { ...groupUpdateDto, ...location })
        await this.meilisearchService.upsertGroup(updated)
    }

    async deleteGroup(groupId: string, deleterId: string) {
        const creatorId = await this.groupRepository.getGroupCreatorId(groupId)
        if (creatorId !== deleterId) throw new AuthorizationError('You cannot delete this group!')
        await this.groupRepository.deleteGroup(groupId)
        await this.meilisearchService.deleteGroup(groupId)
    }
}
