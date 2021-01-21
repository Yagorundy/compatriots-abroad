import { Plugin } from "@nuxt/types";

const p: Plugin = ({ $axios, $jwtService }) => {
  $axios.interceptors.request.use(config => {
    config.headers.Authorization = $jwtService.getToken()
    return config;
  })
  $axios.interceptors.response.use(undefined, error => {
    error = error.toJSON()
    window.alert(error.message)
  })
}

export default p;