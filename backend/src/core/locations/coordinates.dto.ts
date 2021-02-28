import { AutoMap } from "@automapper/classes";
import { ICoordinates } from "../../data/common/coordinates.interface";

export class CoordinatesDto implements ICoordinates {
    @AutoMap()
    lat: number

    @AutoMap()
    lng: number
}
