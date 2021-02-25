import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import type { Mapper } from '@automapper/types';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    mapProfile() {
        return (mapper: Mapper) => {
        }
    }
}
