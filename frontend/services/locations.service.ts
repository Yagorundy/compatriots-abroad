import { NuxtAxiosInstance } from "@nuxtjs/axios";
import { IGetLocationsDto } from "~/../common/transfer/locations/get-locations-dto.interface";
import { GetLocationsTarget } from "~/../common/transfer/locations/get-locations-target.type";
import { ILocation } from "~/../common/transfer/locations/location.interface";

type Cache = { [countyCode: string]: ILocation[] }

export class LocationsService {
  private cache: { [key in GetLocationsTarget]: Cache } = { users: {}, groups: {} }
  constructor(private axios: NuxtAxiosInstance) { }

  private async _getLocations(countryCode: string, target: GetLocationsTarget): Promise<ILocation[]> {
    const params: IGetLocationsDto = { countryOfOrigin: countryCode, target }
    return await this.axios.$get('/locations', { params });
  }

  async getLocations(countryCode: string, target: GetLocationsTarget): Promise<ILocation[]> {
    if (!this.cache[target][countryCode]) {
      this.cache[target][countryCode] = await this._getLocations(countryCode, target)
    }
    return this.cache[target][countryCode]
  }
}
