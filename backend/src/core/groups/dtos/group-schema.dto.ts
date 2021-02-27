import { AutoMap } from "@automapper/classes";
import { IGroupSchema } from "../../../data/mongo/group-schema.interface";

export class GroupSchemaDto implements IGroupSchema {
    @AutoMap()
    id: string

    @AutoMap()
    creatorId: string

    @AutoMap()
    name: string

    @AutoMap()
    description: string

    @AutoMap()
    countryOfOrigin: string

    @AutoMap()
    address: string

    @AutoMap()
    country: string

    @AutoMap()
    lat: number

    @AutoMap()
    lng: number
}
