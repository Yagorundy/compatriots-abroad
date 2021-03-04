<template>
  <div class="container container-with-form">
    <h6>Sign Up</h6>
    
    <form @submit.prevent="signUp">
      <FormGroup label="Email">
        <input type="email" v-model="createUserData.email" />
      </FormGroup>
      <FormGroup label="First Name">
        <input v-model="createUserData.firstName" />
      </FormGroup>
      <FormGroup label="Last Name">
        <input v-model="createUserData.lastName" />
      </FormGroup>
      <FormGroup label="Country of origin">
        <CountrySelector v-model="createUserData.countryOfOrigin" />
      </FormGroup>
      <FormGroup label="Address">
        <input v-model="createUserData.address" />
      </FormGroup>
      <FormGroup label="Password">
        <input type="password" v-model="createUserData.password" />
      </FormGroup>
      <FormGroup label="Confirm Password">
        <input v-model="confirmPassword" />
      </FormGroup>

      <div class="form-footer">
        <button class="btn btn-primary" type="submit">Sign up</button>
        <span>or</span>
        <nuxt-link class="btn btn-secondary" to="/auth/login">Log In</nuxt-link>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { IUserCreateDto } from '~/../common/transfer/users/user-create-dto.interface'

@Component
export default class extends Vue {
  createUserData: IUserCreateDto = {
    address: '',
    countryOfOrigin: '',
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  }
  confirmPassword = ''

  async signUp() {
    await this.$usersService.create(this.createUserData)
    this.$router.push('/auth/login')
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin-top: 6vh;
  max-width: 440px;
}
</style>
