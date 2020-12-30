export interface GeocodingResponse {
    results: GeocodingResponseResult[]
    status: Status
}

export interface GeocodingResponseResult {
    address_components: GeocodingResponseAddressComponent[]
    formatted_address: string
    geometry: {
        bounds: {
            northeast: GeocodingResponseCoordinates
            southwest: GeocodingResponseCoordinates
        }
        location: GeocodingResponseCoordinates
        location_type: string,
        viewport: {
            northeast: GeocodingResponseCoordinates
            southwest: GeocodingResponseCoordinates
        }
    }
    partial_match?: boolean
    place_id: string
    types: string[]
}

export interface GeocodingResponseAddressComponent {
    long_name: string
    short_name: string
    types: string[]
}

export interface GeocodingResponseCoordinates {
    lat: number
    lng: number
}

export type Status = 'OK' | 'ZERO_RESULTS'