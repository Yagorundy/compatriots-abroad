import { Plugin } from "@nuxt/types";
import { IAuthService } from "~/contracts/auth-service.interface";

const p: Plugin = ({ $axios }, inject) => {
  const service: IAuthService = {
    login: (data) => {
      return $axios.$post('http://localhost:3000/users', data)
    },
    getToken: () => {
      if (process.client) {
        return window.localStorage.getItem('token') || undefined;
      }
    }
  }
  inject('authService', service)
}

export default p