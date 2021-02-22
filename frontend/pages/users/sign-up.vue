<template>
  <div class="container">
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
        <input v-model="createUserData.password" />
      </FormGroup>
      <FormGroup label="Confirm Password">
        <input v-model="confirmPassword" />
      </FormGroup>

      <button type="submit">Sign up</button> or <nuxt-link to="/auth/login">Log In</nuxt-link>
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
  background: #fff;
  max-width: 400px;
}
</style>
