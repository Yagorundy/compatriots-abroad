export interface IUser {
    id: string

    firstName: string
    lastName: string

    email: string
    passwordHash: string

    countryOfOrigin: string
    address: string
    country: string
    lat: number
    lng: number
}
