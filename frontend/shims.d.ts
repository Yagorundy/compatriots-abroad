import { NuxtAxiosInstance } from '@nuxtjs/axios'
import Vue from 'vue'
import { AuthService } from './services/auth.service'
import { JwtService } from './services/jwt.service'
import { LocationsService } from './services/locations.service'
import { UsersService } from './services/users.service'

declare module '*.vue' {
  export default Vue
}

interface Services {
  $jwtService: JwtService
  $authService: AuthService
  $usersService: UsersService
  $locationsService: LocationsService
}

declare module 'vue/types/vue' {
  interface Vue extends Services {
  }
}

declare module '@nuxt/types' {
  interface Context extends Services {
    $axios: NuxtAxiosInstance
  }
}
