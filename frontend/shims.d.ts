import { NuxtAxiosInstance } from '@nuxtjs/axios'
import Vue from 'vue'
import { AuthService } from './services/auth.service'
import { GroupsService } from './services/groups.service'
import { JwtService } from './services/jwt.service'
import { LocationsService } from './services/locations.service'
import { MeilisearchService } from './services/meilisearch.service'
import { UsersService } from './services/users.service'

declare module '*.vue' {
  export default Vue
}

interface Services {
  $axios: NuxtAxiosInstance
  $jwtService: JwtService
  $authService: AuthService
  $usersService: UsersService
  $groupsService: GroupsService
  $locationsService: LocationsService
  $meilisearchService: MeilisearchService
}

declare module 'vue/types/vue' {
  interface Vue extends Services {
  }
}

declare module '@nuxt/types' {
  interface Context extends Services {
  }
}
