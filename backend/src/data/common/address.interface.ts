import { ICoordinates } from "./coordinates.interface";

export interface IAddress extends ICoordinates {
    address: string
    country: string
}
