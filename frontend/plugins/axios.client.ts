import { Plugin } from "@nuxt/types";

const p: Plugin = ({ $axios, $jwtService }) => {
  $axios.interceptors.request.use(config => {
    config.headers.Authorization = $jwtService.getToken()
    return config;
  })
  // $axios.interceptors.response.use(undefined, error => {
  //   // TODO parse error
  // })
}

export default p;