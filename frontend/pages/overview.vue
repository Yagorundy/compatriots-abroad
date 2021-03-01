<template>
  <div id="overview" class="container-fluid">
    <header>
      <h6 v-if="!isAuthorized">The website that connects you with your people! <nuxt-link to="/users/sign-up">Sign Up</nuxt-link> or <nuxt-link to="/auth/login">Log In</nuxt-link> and find people and groups abroad.</h6>
      <h3 v-else>Hi {{ username }}!</h3>
    </header>
    
    <main class="container-spaced-horizontally">
      <GoogleMap />
    </main>
  </div>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import { UserMixin } from '~/mixins/user.mixin'

@Component
export default class extends mixins(UserMixin) {
  username: string | null | undefined = null

  async created() {
    this.username = this.user?.firstName
  }
}
</script>

<style lang="scss" scoped>
#overview {
  header {
    margin-bottom: 20px;

    h6 {

      a {
        text-decoration: underline;
        color: green;
      }
    }
  }

  main {
    margin-bottom: 20px;
  }
}
</style>
