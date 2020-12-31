export namespace Geocoding {

  export interface Response {
    results: ResponseResult[]
    status: ResponseStatus
  }

  export interface ResponseResult {
    address_components: ResponseAddressComponent[]
    formatted_address: string
    geometry: {
        bounds: {
            northeast: ResponseCoordinates
            southwest: ResponseCoordinates
        }
        location: ResponseCoordinates
        location_type: string,
        viewport: {
            northeast: ResponseCoordinates
            southwest: ResponseCoordinates
        }
    }
    partial_match?: boolean
    place_id: string
    types: string[]
  }

  export interface ResponseAddressComponent {
    long_name: string
    short_name: string
    types: string[]
  }

  export interface ResponseCoordinates {
    lat: number
    lng: number
  }

  export type ResponseStatus = 'OK' | 'ZERO_RESULTS'
}
