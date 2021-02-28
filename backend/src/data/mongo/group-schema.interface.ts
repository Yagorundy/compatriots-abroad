import { IAddress } from "../common/address.interface";

export interface IGroupSchema extends IAddress {
    id: string
    creatorId: string

    name: string
    description: string

    countryOfOrigin: string
}
