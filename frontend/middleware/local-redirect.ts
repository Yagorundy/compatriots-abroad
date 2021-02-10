import { Middleware } from "@nuxt/types";

/** @description Ensures that the next middleware will be executed on the client side */
const m: Middleware = ({ route, redirect }) => {
  if (process.server) {
    redirect(`/local-redirect?path=${encodeURIComponent(route.path)}`)
  }
}

export default m
