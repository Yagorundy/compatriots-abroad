import { NuxtAxiosInstance } from "@nuxtjs/axios";
import { ICoordinatesDto } from "~/../common/transfer/coordinates/coordinates-dto.interface";
import { IGetCoordinatesDto } from "~/../common/transfer/coordinates/get-coordinates-dto.interface";
import { GetCoordinatesTarget } from "~/../common/transfer/coordinates/get-coordinates-target.type";

export class LocationsService {
  constructor(private axios: NuxtAxiosInstance) { }

  async getCoordinates(countryCode: string, target: GetCoordinatesTarget) {
    const params: IGetCoordinatesDto = { countryOfOrigin: countryCode, target }
    return await this.axios.$get<ICoordinatesDto[]>('/coordinates', { params });
  }

  async getCountryCodeByLocation(location: ICoordinatesDto) {
    return await this.axios.$get<string>('/country-code', { params: location })
  }
}
