export namespace Geocoding {
    export interface Response {
        results: ResponseResult[]
        status: Status
    }

    export interface ResponseResult {
        address_components: AddressComponent[]
        formatted_address: string
        geometry: {
            bounds: {
                northeast: Coordinates
                southwest: Coordinates
            }
            location: Coordinates
            location_type: string
            viewport: {
                northeast: Coordinates
                southwest: Coordinates
            }
        }
        partial_match?: boolean
        place_id: string
        types: string[]
    }

    export interface AddressComponent {
        long_name: string
        short_name: string
        types: string[]
    }

    export interface Coordinates {
        lat: number
        lng: number
    }

    export type Status = 'OK' | 'ZERO_RESULTS'
}
