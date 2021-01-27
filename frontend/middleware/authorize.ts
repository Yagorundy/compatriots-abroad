import { Middleware } from "@nuxt/types";

const m: Middleware = ({ $jwtService, redirect }) => {
  if (!$jwtService.getToken()) {
    return redirect('/login');
  }
}

export default m