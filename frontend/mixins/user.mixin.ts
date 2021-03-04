import { Component, Vue } from "nuxt-property-decorator";

export interface IUserMixin {
  readonly isAuthorized: boolean
  readonly userId: string | undefined
}

@Component
export class UserMixin extends Vue implements IUserMixin {
  private isAuthorizedKey = 0
  
  created() {
    this.$jwtService.addTokenChangeEventListener(() => this.isAuthorizedKey++)
  }

  get isAuthorized() {
    this.isAuthorizedKey
    return !!this.$jwtService.getToken()
  }

  get userId() {
    return this.$jwtService.getTokenPayload()?.sub
  }
}
