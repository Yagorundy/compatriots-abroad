<template>
  <div class="container">
    TODO
    Add edit profile functionalities

    <button
      id="logout-btn"
      type="button"
      @click="logout"
    >Logout</button>
  </div>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import { AuthorizeMixin } from '~/mixins/authorize.mixin'

@Component
export default class extends mixins(AuthorizeMixin) {
  logout() {
    this.$router.push('logout')
  }
}
</script>

<style lang="scss" scoped>

</style>
