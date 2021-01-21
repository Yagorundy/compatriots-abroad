<template>
  <div class="container">
    <form @submit.prevent="signUp">
      <FormGroup label="Email">
        <input type="email" v-model="data.email" />
      </FormGroup>
      <FormGroup label="First Name">
        <input v-model="data.firstName" />
      </FormGroup>
      <FormGroup label="Last Name">
        <input v-model="data.lastName" />
      </FormGroup>
      <FormGroup label="Address">
        <input v-model="data.address" />
      </FormGroup>
      <FormGroup label="Password">
        <input v-model="data.password" />
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
  data: IUserCreateDto = {
    address: '',
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  }
  confirmPassword = ''

  async signUp() {
    try {
      await this.$userService.create(this.data)
      this.$router.push('login')
    } catch(err) {
      throw err
    } finally {

    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  background: #fff;
  max-width: 400px;
}
</style>