import { Injectable } from "@nestjs/common";
import { IGetGroupsForUser } from "../../../../common/transfer/groups/get-groups-for-user-dto.interface";
import { IGroupCreateDto } from "../../../../common/transfer/groups/group-create-dto.interface";
import { IGroupDto } from "../../../../common/transfer/groups/group-dto.interface";
import { GeocodingService } from "../../infrastructure/geocoding/geocoding.service";
import { GroupRepository } from "../../infrastructure/mongo/groups/group.repository";

@Injectable()
export class GroupsService {
    constructor(private groupRepository: GroupRepository, private geocodingService: GeocodingService) { }

    async createGroup(creatorId: string, groupCreateDto: IGroupCreateDto) {
        const location = await this.geocodingService.getLocationByAddress(groupCreateDto.address)
        await this.groupRepository.createGroup(creatorId, {
            name: groupCreateDto.name,
            description: groupCreateDto.description,
            countryOfOrigin: groupCreateDto.countryOfOrigin,
            address: groupCreateDto.address,
            country: location.countryCode,
            lat: location.lat,
            lng: location.lng
        })
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
}
