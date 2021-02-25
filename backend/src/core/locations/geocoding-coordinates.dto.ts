import { AutoMap } from "@automapper/classes";
import { Geocoding } from "../../data/geocoding/geocoding.namespace";

export class GeocodingCoordinatesDto implements Geocoding.Coordinates {
    @AutoMap()
    lat: number

    @AutoMap()
    lng: number
}
