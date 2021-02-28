import { AutoMap } from "@automapper/classes";
import { IGroupSchema } from "../../../data/mongo/group-schema.interface";
import { AddressDto } from "../../locations/address.dto";

export class GroupSchemaDto extends AddressDto implements IGroupSchema  {
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
}
