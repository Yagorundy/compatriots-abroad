import { AutoMap } from "@automapper/classes";
import { IUserSchema } from "../../../data/mongo/user-schema.interface";
import { AddressDto } from "../../locations/address.dto";


export class UserSchemaDto extends AddressDto implements IUserSchema {
    @AutoMap()
    id: string

    @AutoMap()
    firstName: string

    @AutoMap()
    lastName: string

    @AutoMap()
    email: string

    @AutoMap()
    passwordHash: string

    @AutoMap()
    countryOfOrigin: string

    @AutoMap()
    likedGroups: string[]
}
