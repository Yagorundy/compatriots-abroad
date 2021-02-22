import { GeocodingResponseResult } from "./geocoding-response-result.interface";
import { GeocodingResponseStatus } from "./geocoding-response-status.type";

export interface GeocodingResponse {
    results: GeocodingResponseResult[]
    status: GeocodingResponseStatus
}
