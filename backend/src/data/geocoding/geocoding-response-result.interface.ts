import { GeocodingResponseAddressComponent } from "./geocoding-response-address-component.interface";
import { GeocodingResponseCoordinates } from "./geocoding-response-coordinates";

export interface GeocodingResponseResult {
    address_components: GeocodingResponseAddressComponent[]
    formatted_address: string
    geometry: {
        bounds: {
            northeast: GeocodingResponseCoordinates
            southwest: GeocodingResponseCoordinates
        }
        location: GeocodingResponseCoordinates
        location_type: string
        viewport: {
            northeast: GeocodingResponseCoordinates
            southwest: GeocodingResponseCoordinates
        }
    }
    partial_match?: boolean
    place_id: string
    types: string[]
}
