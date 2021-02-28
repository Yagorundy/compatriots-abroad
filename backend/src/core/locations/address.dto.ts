import { AutoMap } from "@automapper/classes";
import { IAddress } from "../../data/common/address.interface";
import { LocationDto } from "./location.dto";

export class AddressDto extends LocationDto implements IAddress  {
    @AutoMap()
    address: string
}
