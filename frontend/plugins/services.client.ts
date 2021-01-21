import { Plugin } from "@nuxt/types";
import { AuthService } from "~/services/auth.service";
import { JwtService } from "~/services/jwt.service";


const p: Plugin = ({ $axios }, inject) => {
  inject('jwtService', new JwtService())
  inject('authService', new AuthService($axios))
}

export default p;