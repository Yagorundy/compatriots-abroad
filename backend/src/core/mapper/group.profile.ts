import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/types';
import { Injectable } from '@nestjs/common';
import { GroupSchemaDto } from '../groups/dtos/group-schema.dto';
import { MeilisearchGroupDto } from '../groups/dtos/meilisearch-group.dto';

@Injectable()
export class GroupProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    mapProfile() {
        return (mapper: Mapper) => {
            mapper.createMap(GroupSchemaDto, MeilisearchGroupDto)
        }
    }
}
