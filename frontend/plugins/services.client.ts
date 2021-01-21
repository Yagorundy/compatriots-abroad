import { Plugin } from "@nuxt/types";
import { AuthService } from "~/services/auth.service";
import { JwtService } from "~/services/jwt.service";
import { UserService } from "~/services/user.service";


const p: Plugin = ({ $axios }, inject) => {
  inject('jwtService', new JwtService())
  inject('authService', new AuthService($axios))
  inject('userService', new UserService($axios))
}

export default p;