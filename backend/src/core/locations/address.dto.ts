import { AutoMap } from "@automapper/classes";
import { IAddress } from "../../data/common/address.interface";
import { CoordinatesDto } from "./coordinates.dto";

export class AddressSchemaDto extends CoordinatesDto implements IAddress  {
    @AutoMap()
    address: string

    @AutoMap()
    country: string
}
