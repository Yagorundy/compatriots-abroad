import { NuxtAxiosInstance } from '@nuxtjs/axios'
import Vue from 'vue'
import { IAuthService } from './contracts/auth-service.interface'

declare module '*.vue' {
  export default Vue
}

declare module 'vue/types/vue' {
  interface Vue {
    $authService: IAuthService
  }
}

declare module '@nuxt/types' {
  interface Context {
    $axios: NuxtAxiosInstance
    $authService: IAuthService
  }
}