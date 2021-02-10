import { Plugin } from "@nuxt/types";

const p: Plugin = ({ $axios, $jwtService }) => {
  $axios.interceptors.request.use(config => {
    config.baseURL = process.env.BACKEND_PREFIX;
    config.headers.Authorization = 'Bearer ' + $jwtService.getToken()
    return config;
  })
  // $axios.interceptors.response.use(undefined, error => {
  //   // TODO parse error
  // })
}

export default p;
