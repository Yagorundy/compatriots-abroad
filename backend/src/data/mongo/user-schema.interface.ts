import { IAddress } from "../common/address.interface";

export interface IUserSchema extends IAddress {
    id: string

    firstName: string
    lastName: string

    email: string
    passwordHash: string

    countryOfOrigin: string

    likedGroups: string[]
}
