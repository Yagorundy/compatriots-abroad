<template>
  <div id="overview" class="container-fluid">
    <header>
      <h6 v-if="!isAuthorized">The website that connects you with your people! <nuxt-link to="/users/sign-up">Sign Up</nuxt-link> or <nuxt-link to="/auth/login">Log In</nuxt-link> and find people and groups abroad.</h6>
      <h3 v-else-if="user.firstName">Hi {{ user.firstName }}!</h3>
    </header>
    
    <main class="container-spaced-horizontally">
      <GoogleMap />
    </main>
  </div>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import { IUserProfileDto } from '~/../common/transfer/users/user-profile-dto.interface'
import { UserMixin } from '~/mixins/user.mixin'

@Component
export default class extends mixins(UserMixin) {
  user: IUserProfileDto = {
    firstName: '',
    lastName: '',
    countryOfOrigin: '',
    email: '',
    address: ''
  }

  async created() {
    if (this.isAuthorized) {
      this.user = await this.$usersService.get()
    }
  }
}
</script>

<style lang="scss" scoped>
#overview {
  header {
    margin-bottom: 20px;

    h6 {

      a {
        white-space: nowrap;
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
