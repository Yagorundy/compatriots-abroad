import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/types';
import { Injectable } from '@nestjs/common';
import { CoordinatesDto } from '../locations/coordinates.dto';
import { GeocodingCoordinatesDto } from '../locations/geocoding-coordinates.dto';

@Injectable()
export class LocationProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    mapProfile() {
        return (mapper: Mapper) => {
            mapper.createMap(GeocodingCoordinatesDto, CoordinatesDto);
        }
    }
}
