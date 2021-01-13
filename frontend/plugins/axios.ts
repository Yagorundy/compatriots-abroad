import { Plugin } from "@nuxt/types";

const p: Plugin = ({ $axios, $authService }, inject) => {
  $axios.interceptors.request.use(config => {
    config.headers.Authorization = $authService.getToken()
    return config;
  })
  $axios.interceptors.response.use(undefined, error => {
    error = error.toJSON()
    window.alert(error.message)
  })
}

export default p;