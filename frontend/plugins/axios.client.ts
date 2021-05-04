import { Plugin } from "@nuxt/types";

const p: Plugin = ({ $config, $axios, $jwtService }) => {
  $axios.interceptors.request.use(config => {
    config.baseURL = $config.backendPrefix;
    config.headers.Authorization = 'Bearer ' + $jwtService.getToken()
    return config;
  })
  // $axios.interceptors.response.use(undefined, error => {
  //   // TODO parse error
  // })
}

export default p;
