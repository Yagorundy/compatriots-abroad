import { NuxtAxiosInstance } from "@nuxtjs/axios";
import { IUserCreateDto } from "~/../common/transfer/users/user-create-dto.interface";
import { IUserProfile } from "~/../common/transfer/users/user-profile.interface";

export class UsersService {
  constructor(private axios: NuxtAxiosInstance) { }

  async create(data: IUserCreateDto) {
    return this.axios.$post('/users', data)
  }

  async get() {
    return await this.axios.$get<IUserProfile>('/user')
  }

  async update(data: IUserProfile) {
    return await this.axios.$put('/user', data)
  }
}
