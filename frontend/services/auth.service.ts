import { NuxtAxiosInstance } from "@nuxtjs/axios";
import { IUserLoginDto } from "~/../common/transfer/auth/user-login-dto.interface";

export class AuthService {
  constructor(private axios: NuxtAxiosInstance) { }

  login(data: IUserLoginDto) {
    return this.axios.$post('http://localhost:3000/users', data)
  }
}