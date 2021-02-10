import { IJwtPayload } from "~/../common/transfer/auth/jwt-payload.interface";

export class JwtService {
  private static readonly JWT_KEY = 'token';

  get token(): string | null {
    return window.localStorage.getItem(JwtService.JWT_KEY)
  }

  set token(token: string | null) {
    if (token === null) {
      window.localStorage.removeItem(JwtService.JWT_KEY)
    } else {
      window.localStorage.setItem(JwtService.JWT_KEY, token)
    }
  }

  get tokenPayload(): IJwtPayload | undefined {
    if (this.token) {
      const [,payload] = this.token.split('.')
      return JSON.parse(atob(payload))
    }
  }
}
