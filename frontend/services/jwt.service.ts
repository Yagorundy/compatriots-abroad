import { IJwtPayload } from "~/../common/transfer/auth/jwt-payload.interface";

type TokenChangeEventListener = () => any

export class JwtService {
  private static readonly JWT_KEY = 'token';

  private tokenChangeListeners: TokenChangeEventListener[] = [];

  addTokenChangeEventListener(observer: TokenChangeEventListener) {
      this.tokenChangeListeners.push(observer);
  }

  removeTokenChangeEventListener(observer: TokenChangeEventListener) {
      this.tokenChangeListeners.splice(this.tokenChangeListeners.indexOf(observer));
  }

  private dispatchTokenChange() {
      for (const listener of this.tokenChangeListeners) {
        listener()
      }
  }

  getToken(): string | null {
    return window.localStorage.getItem(JwtService.JWT_KEY)
  }

  setToken(token: string) {
    window.localStorage.setItem(JwtService.JWT_KEY, token)
    this.dispatchTokenChange()
  }

  clearToken() {
    window.localStorage.removeItem(JwtService.JWT_KEY)
    this.dispatchTokenChange()
  }

  getTokenPayload(): IJwtPayload | undefined {
    const token = this.getToken()
    if (token) {
      const [,payload] = token.split('.')
      return JSON.parse(atob(payload))
    }
  }
}
