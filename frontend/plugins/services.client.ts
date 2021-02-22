import { Plugin } from "@nuxt/types";
import { AuthService } from "~/services/auth.service";
import { GroupsService } from "~/services/groups.service";
import { JwtService } from "~/services/jwt.service";
import { LocationsService } from '~/services/locations.service';
import { UsersService } from "~/services/users.service";


const p: Plugin = ({ $axios }, inject) => {
  inject('jwtService', new JwtService())
  inject('authService', new AuthService($axios))
  inject('usersService', new UsersService($axios))
  inject('groupsService', new GroupsService($axios))
  inject('locationsService', new LocationsService($axios))
}

export default p;
