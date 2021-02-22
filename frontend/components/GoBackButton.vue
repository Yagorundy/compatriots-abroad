<template>
  <div>
    TODO: Go back button
  </div>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import { AuthorizeMixin } from '~/mixins/authorize.mixin'

@Component
export default class extends mixins(AuthorizeMixin) {
}
</script>

<style lang="scss" scoped>

</style>
