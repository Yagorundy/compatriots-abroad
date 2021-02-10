import { NuxtAxiosInstance } from "@nuxtjs/axios";
import { IUserCreateDto } from "~/../common/transfer/users/user-create-dto.interface";
import { IUserProfile } from "~/../common/transfer/users/user-profile.interface";

export class UsersService {
  constructor(private axios: NuxtAxiosInstance) { }

  create(data: IUserCreateDto) {
    return this.axios.$post('/users', data)
  }

  get() {
    return this.axios.$get<IUserProfile>('/user')
  }

  update(data: IUserProfile) {
    return this.axios.$put('/user', data)
  }
}
