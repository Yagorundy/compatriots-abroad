import { NuxtAxiosInstance } from "@nuxtjs/axios";
import { IGetLocationsDto } from "~/../common/transfer/locations/get-locations-dto.interface";
import { GetLocationsTarget } from "~/../common/transfer/locations/get-locations-target.type";
import { ILocation } from "~/../common/transfer/locations/location.interface";

type Cache = { [countyCode: string]: ILocation[] }

export class LocationsService {
  private userLocationsCache: Cache = {}
  private groupLocationsCache: Cache = {}
  constructor(private axios: NuxtAxiosInstance) { }

  private async getLocations(countryCode: string, target: GetLocationsTarget): Promise<ILocation[]> {
    const params: IGetLocationsDto = { countryOfOrigin: countryCode, target }
    return await this.axios.$get('/locations', { params });
  }

  async getUserLocations(countryCode: string) {
    if (!this.userLocationsCache[countryCode]) {
      const locations = await this.getLocations(countryCode, 'users')
      this.userLocationsCache[countryCode] = locations
    }
    return this.userLocationsCache[countryCode]
  }
}
