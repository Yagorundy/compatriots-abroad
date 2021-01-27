import { IJwtPayload } from "~/../common/transfer/auth/jwt-payload.interface";

export class JwtService {
  private static readonly JWT_KEY = 'token';

  getToken() {
    return window.localStorage.getItem(JwtService.JWT_KEY)
  }

  setToken(token: string) {
    return window.localStorage.setItem(JwtService.JWT_KEY, token)
  }

  clearToken() {
    window.localStorage.removeItem(JwtService.JWT_KEY)
  }

  getTokenPayload(): IJwtPayload | undefined {
    const token = this.getToken()
    if (token) {
      const [,payload] = token.split('.')
      return JSON.parse(atob(payload))
    }
  }
}
