import { IJwtResponseDto } from "~/../common/transfer/auth/jwt-response-dto.interface";
import { IUserLoginDto } from "~/../common/transfer/auth/user-login-dto.interface";

export interface IAuthService {
  login(data: IUserLoginDto): Promise<IJwtResponseDto>
  getToken(): string | undefined
}