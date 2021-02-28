import { NuxtAxiosInstance } from "@nuxtjs/axios";
import { ICoordinatesDto } from "~/../common/transfer/coordinates/coordinates-dto.interface";
import { IGetCoordinatesDto } from "~/../common/transfer/coordinates/get-coordinates-dto.interface";
import { GetCoordinatesTarget } from "~/../common/transfer/coordinates/get-coordinates-target.type";

type Cache = { [countyCode: string]: ICoordinatesDto[] }

export class LocationsService {
  private cache: { [key in GetCoordinatesTarget]: Cache } = { users: {}, groups: {} }
  constructor(private axios: NuxtAxiosInstance) { }

  private async _getCoordinates(countryCode: string, target: GetCoordinatesTarget) {
    const params: IGetCoordinatesDto = { countryOfOrigin: countryCode, target }
    return await this.axios.$get<ICoordinatesDto[]>('/coordinates', { params });
  }

  async getCoordinates(countryCode: string, target: GetCoordinatesTarget) {
    if (!this.cache[target][countryCode]) {
      this.cache[target][countryCode] = await this._getCoordinates(countryCode, target)
    }
    return this.cache[target][countryCode]
  }

  async getCountryCodeByLocation(location: ICoordinatesDto) {
    return await this.axios.$get<string>('/country-code', { params: location })
  }
}
