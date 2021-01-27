import { NuxtAxiosInstance } from "@nuxtjs/axios";
import { IUserCreateDto } from "~/../common/transfer/users/user-create-dto.interface";

export class UserService {
  constructor(private axios: NuxtAxiosInstance) { }

  create(data: IUserCreateDto) {
    return this.axios.$post('/users', data)
  }
}
