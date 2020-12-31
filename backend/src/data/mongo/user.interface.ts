export interface IUser {
  firstName: string
  lastName: string

  email: string
  passwordHash: string

  countryOfOrigin: string
  country: string
  address: string
  lat: number
  lng: number
}
