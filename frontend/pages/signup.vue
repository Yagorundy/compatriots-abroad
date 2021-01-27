<template>
  <div class="container">
    <form @submit.prevent="signUp">
      <FormGroup label="Email">
        <input type="email" v-model="userCreateData.email" />
      </FormGroup>
      <FormGroup label="First Name">
        <input v-model="userCreateData.firstName" />
      </FormGroup>
      <FormGroup label="Last Name">
        <input v-model="userCreateData.lastName" />
      </FormGroup>
      <FormGroup label="Address">
        <input v-model="userCreateData.address" />
      </FormGroup>
      <FormGroup label="Password">
        <input v-model="userCreateData.password" />
      </FormGroup>
      <FormGroup label="Confirm Password">
        <input v-model="confirmPassword" />
      </FormGroup>

      <button type="submit">Sign up</button> or <nuxt-link to="login">Log In</nuxt-link>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { IUserCreateDto } from '~/../common/transfer/users/user-create-dto.interface'

@Component
export default class extends Vue {
  userCreateData: IUserCreateDto = {
    address: '',
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  }
  confirmPassword = ''

  async signUp() {
    await this.$userService.create(this.userCreateData)
    this.$router.push('login')
  }
}
</script>

<style lang="scss" scoped>
.container {
  background: #fff;
  max-width: 400px;
}
</style>