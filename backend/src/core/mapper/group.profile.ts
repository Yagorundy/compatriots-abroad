import { mapWithArguments } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/types';
import { Injectable } from '@nestjs/common';
import { GroupCreateDto } from '../groups/dtos/group-create.dto';
import { GroupSchemaDto } from '../groups/dtos/group-schema.dto';
import { GroupDto } from '../groups/dtos/group.dto';
import { MeilisearchGroupDto } from '../groups/dtos/meilisearch-group.dto';
import { AddressDto } from '../locations/address.dto';
import { LocationDto } from '../locations/location.dto';

@Injectable()
export class GroupProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    mapProfile() {
        return (mapper: Mapper) => {
            mapper.createMap(GroupCreateDto, GroupSchemaDto)

            mapper.createMap(LocationDto, GroupSchemaDto)
            mapper.createMap(AddressDto, GroupSchemaDto)

            mapper.createMap(GroupSchemaDto, MeilisearchGroupDto)

            mapper.createMap(GroupSchemaDto, GroupDto)
                .forMember(
                    source => source.isLiked,
                    mapWithArguments((_, { isLiked }) => isLiked)
                )
        }
    }
}
