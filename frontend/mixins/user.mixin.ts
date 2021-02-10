import { Component, Vue } from "nuxt-property-decorator";
import { IUserPublic } from "~/../common/transfer/users/user-public.interface";

interface IUser extends IUserPublic {
  id: string
}

export interface IUserMixin {
  readonly isAuthorized: boolean
  readonly userId: string | undefined
  readonly user: IUser | undefined
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

  get user() {
    const tokenPayload = this.$jwtService.getTokenPayload()
    if (tokenPayload) {
      return {
        id: tokenPayload.sub,
        firstName: tokenPayload.firstName,
        lastName: tokenPayload.lastName,
        countryOfOrigin: tokenPayload.countryOfOrigin
      }
    }
  }
}
