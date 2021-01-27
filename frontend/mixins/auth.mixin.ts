import { Component, Vue } from "nuxt-property-decorator";

@Component
export class AuthMixin extends Vue {
  get isAuthorized() {
    return !!this.$jwtService.getToken()
  }
}
