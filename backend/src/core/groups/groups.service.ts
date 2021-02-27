import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/types";
import { Injectable } from "@nestjs/common";
import { AuthorizationError } from "../../../../common/errors/authorization.error";
import { IGetGroupsForUser } from "../../../../common/transfer/groups/get-groups-for-user-dto.interface";
import { IGroupCreateDto } from "../../../../common/transfer/groups/group-create-dto.interface";
import { IGroupDto } from "../../../../common/transfer/groups/group-dto.interface";
import { GeocodingService } from "../../infrastructure/geocoding/geocoding.service";
import { MeilisearchService } from "../../infrastructure/meilisearch/meilisearch.service";
import { GroupRepository } from "../../infrastructure/mongo/groups/group.repository";
import { GroupSchemaDto } from "./dtos/group-schema.dto";
import { MeilisearchGroupDto } from "./dtos/meilisearch-group.dto";

@Injectable()
export class GroupsService {
    constructor(
        private groupRepository: GroupRepository,
        private geocodingService: GeocodingService,
        private meilisearchService: MeilisearchService,
        @InjectMapper() private mapper: Mapper
    ) { }

    async createGroup(creatorId: string, groupCreateDto: IGroupCreateDto) {
        const location = await this.geocodingService.getLocationByAddress(groupCreateDto.address)
        const group = await this.groupRepository.createGroup(creatorId, {
            name: groupCreateDto.name,
            description: groupCreateDto.description,
            countryOfOrigin: groupCreateDto.countryOfOrigin,
            address: groupCreateDto.address,
            country: location.countryCode,
            lat: location.lat,
            lng: location.lng
        })
        await this.meilisearchService.addGroup(this.mapper.map(group, MeilisearchGroupDto, GroupSchemaDto))
    }

    async getGroup(id: string): Promise<IGroupDto> {
        return await this.groupRepository.getGroup(id)
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

    async getGroupLocations(countryOfOriginCode: string) {
        return await this.groupRepository.getGroupLocations(countryOfOriginCode)
    }

    async deleteGroup(id: string, deleterId: string) {
        const creator = await this.groupRepository.getGroupCreatorId(id)
        if (creator !== deleterId) throw new AuthorizationError('You cannot delete this group!')
        await this.groupRepository.deleteGroup(id)
        await this.meilisearchService.deleteGroup(id)
    }
}
