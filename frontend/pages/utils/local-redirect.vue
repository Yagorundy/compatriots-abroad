<template>
  <div></div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

/** @description Part of the `local-redirect` middleware. Redirects to the original url */
@Component
export default class extends Vue {
  created() {
    this.$router.push(this.$route.query.path.toString() || '/')
  }
}
</script>

<style lang="scss" scoped>

</style>
