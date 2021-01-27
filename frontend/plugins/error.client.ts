import { Plugin } from "@nuxt/types";
import { Vue } from 'nuxt-property-decorator'

const p: Plugin = () => {
  Vue.config.productionTip = false
  Vue.config.errorHandler = err => console.error(err)
}

export default p;
