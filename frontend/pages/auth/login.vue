<template>
  <div class="container container-with-form">
    <h6>Log In</h6>

    <form @submit.prevent="login">
      <FormGroup label="Email">
        <input type="email" v-model="userLoginData.email" />
      </FormGroup>
      <FormGroup label="Password">
        <input type="password" v-model="userLoginData.password" />
      </FormGroup>

      <div class="form-footer">
        <button class="btn btn-primary" type="submit">Log In</button>
        <span>or</span>
        <nuxt-link class="btn btn-secondary" to="/users/sign-up">Sign up</nuxt-link>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { IUserLoginDto } from '~/../common/transfer/auth/user-login-dto.interface'

@Component
export default class extends Vue {
  userLoginData: IUserLoginDto = {
    email: '',
    password: ''
  }

  async login() {
    const { access_token } = await this.$authService.login(this.userLoginData)
    this.$jwtService.setToken(access_token)
    this.$router.push('/')
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin-top: 18vh;
  max-width: 400px;
}
</style>
