import { Middleware } from "@nuxt/types";

/** @description ensures that the user is authorized. Must be executed on the client side */
const m: Middleware = ({ $jwtService, redirect }) => {
  if (!$jwtService.token) {
    redirect('/login');
  }
}

export default m
