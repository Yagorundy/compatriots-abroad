import { AutoMap } from "@automapper/classes";
import { ILocation } from "../../data/common/location.interface";

export class LocationDto implements ILocation {
    @AutoMap()
    lat: number

    @AutoMap()
    lng: number

    @AutoMap()
    country: string
}
