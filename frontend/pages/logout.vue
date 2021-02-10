<template>
  <div></div>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import { AuthorizeMixin } from '~/mixins/authorize.mixin'

@Component
export default class extends mixins(AuthorizeMixin) {
  async created() {
    this.$jwtService.clearToken()
    this.$router.push('login')
  }
}
</script>
