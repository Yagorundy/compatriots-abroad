import { NuxtAxiosInstance } from "@nuxtjs/axios";
import { IGetLocationsDto } from "~/../common/transfer/locations/get-locations-dto.interface";
import { GetLocationsTarget } from "~/../common/transfer/locations/get-locations-target.type";
import { ILocationDto } from "~/../common/transfer/locations/location-dto.interface";

type Cache = { [countyCode: string]: ILocationDto[] }

export class LocationsService {
  private cache: { [key in GetLocationsTarget]: Cache } = { users: {}, groups: {} }
  constructor(private axios: NuxtAxiosInstance) { }

  private async _getLocations(countryCode: string, target: GetLocationsTarget) {
    const params: IGetLocationsDto = { countryOfOrigin: countryCode, target }
    return await this.axios.$get<ILocationDto[]>('/locations', { params });
  }

  async getLocations(countryCode: string, target: GetLocationsTarget) {
    if (!this.cache[target][countryCode]) {
      this.cache[target][countryCode] = await this._getLocations(countryCode, target)
    }
    return this.cache[target][countryCode]
  }

  async getCountryCodeByLocation(location: ILocationDto) {
    return await this.axios.$get<string>('/country-code', { params: location })
  }
}
