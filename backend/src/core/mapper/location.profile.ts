import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import type { Mapper } from '@automapper/types';
import { Injectable } from '@nestjs/common';
import { GeocodingCoordinatesDto } from '../locations/geocoding-coordinates.dto';
import { LocationDto } from '../locations/location.dto';

@Injectable()
export class LocationProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    mapProfile() {
        return (mapper: Mapper) => {
            mapper.createMap(GeocodingCoordinatesDto, LocationDto);
        }
    }
}
