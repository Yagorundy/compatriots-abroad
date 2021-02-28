import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/types';
import { Injectable } from '@nestjs/common';
import { AddressDto } from '../locations/address.dto';
import { LocationDto } from '../locations/location.dto';
import { UserCreateDto } from '../users/dtos/user-create.dto';
import { UserSchemaDto } from '../users/dtos/user-schema.dto';

@Injectable()
export class UserProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    mapProfile() {
        return (mapper: Mapper) => {
            mapper.createMap(UserCreateDto, UserSchemaDto)

            mapper.createMap(LocationDto, UserSchemaDto)
            mapper.createMap(AddressDto, UserSchemaDto)
        }
    }
}
