import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/types';
import { Injectable } from '@nestjs/common';
import { GroupSchemaDto } from '../groups/dtos/group-schema.dto';
import { AddressDto } from '../locations/address.dto';
import { LocationDto } from '../locations/location.dto';
import { UserSchemaDto } from '../users/dtos/user-schema.dto';

@Injectable()
export class LocationProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    mapProfile() {
        return (mapper: Mapper) => {
        }
    }
}
