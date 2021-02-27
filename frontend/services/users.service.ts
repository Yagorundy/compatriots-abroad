import { NuxtAxiosInstance } from "@nuxtjs/axios";
import { IUserCreateDto } from "~/../common/transfer/users/user-create-dto.interface";
import { IUserProfileDto } from "~/../common/transfer/users/user-profile-dto.interface";

export class UsersService {
  constructor(private axios: NuxtAxiosInstance) { }

  async create(data: IUserCreateDto) {
    return this.axios.$post('/users', data)
  }

  async get() {
    return await this.axios.$get<IUserProfileDto>('/user')
  }

  async update(data: IUserProfileDto) {
    return await this.axios.$put('/user', data)
  }
}
