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
  get isAuthorized() {
    return !!this.$jwtService.token
  }

  get userId() {
    return this.$jwtService.tokenPayload?.sub
  }

  get user() {
    const tokenPayload = this.$jwtService.tokenPayload
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
