import { NuxtAxiosInstance } from "@nuxtjs/axios";
import { IJwtResponseDto } from "~/../common/transfer/auth/jwt-response-dto.interface";
import { IUserLoginDto } from "~/../common/transfer/auth/user-login-dto.interface";

export class AuthService {
  constructor(private axios: NuxtAxiosInstance) { }

  login(data: IUserLoginDto) {
    return this.axios.$post<IJwtResponseDto>('/auth/login', data)
  }
}
