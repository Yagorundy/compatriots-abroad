<template>
  <div></div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class extends Vue {
  async created() {
    this.$jwtService.clearToken()
    this.$router.push('login')
  }
}
</script>
