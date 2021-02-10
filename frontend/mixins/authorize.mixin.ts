import { Component, mixins } from "nuxt-property-decorator";
import { IUserMixin, UserMixin } from "./user.mixin";

type NonNullableUserMixin = UserMixin & {
  [key in keyof IUserMixin]: NonNullable<IUserMixin[key]>
};

@Component({
  middleware: ['local-redirect', 'authorize']
})
export class AuthorizeMixin extends mixins<NonNullableUserMixin>(UserMixin) {}
