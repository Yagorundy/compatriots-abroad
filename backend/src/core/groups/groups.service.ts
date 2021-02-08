import { Injectable } from "@nestjs/common";
import { IGroupCreateDto } from "../../../../common/transfer/groups/group-create-dto.interface";
import { GeocodingService } from "../../infrastructure/geocoding/geocoding.service";
import { GroupRepository } from "../../infrastructure/mongo/groups/group.repository";

@Injectable()
export class GroupsService {
    constructor(private groupRepository: GroupRepository, private geocodingService: GeocodingService) { }

    async create(creatorId: string, groupCreateDto: IGroupCreateDto) {
        const location = await this.geocodingService.getLocationByAddress(groupCreateDto.address)
        await this.groupRepository.create(creatorId, {
            name: groupCreateDto.name,
            description: groupCreateDto.description,
            countryOfOrigin: groupCreateDto.countryOfOrigin,
            address: groupCreateDto.address,
            country: location.countryCode,
            lat: location.lat,
            lng: location.lng
        })
    }

    async getGroupLocations(countryOfOriginCode: string) {
        return await this.groupRepository.getGroupLocations(countryOfOriginCode)
    }
}
