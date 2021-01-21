export class JwtService {
  private static readonly JWT_KEY = 'token';

  getToken() {
    return window.localStorage.getItem(JwtService.JWT_KEY)
  }

  setToken(token: string) {
    return window.localStorage.setItem(JwtService.JWT_KEY, token)
  }

  getTokenPayload() {
    const token = this.getToken()
    if (token) return btoa(token)
  }
}