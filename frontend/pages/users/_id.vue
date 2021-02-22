<template>
  <div class="container">
    <form @submit.prevent="update">
      <FormGroup label="Email">
        <input type="email" v-model="profile.email" />
      </FormGroup>
      <FormGroup label="First Name">
        <input v-model="profile.firstName" />
      </FormGroup>
      <FormGroup label="Last Name">
        <input v-model="profile.lastName" />
      </FormGroup>
      <FormGroup label="Country of origin">
        <CountrySelector v-model="profile.countryOfOrigin" />
      </FormGroup>
      <FormGroup label="Address">
        <input v-model="profile.address" />
      </FormGroup>

      <button type="submit" :disabled="!hasChanges">Save</button>
    </form>

    <button
      id="logout-btn"
      type="button"
      @click="logout"
    >Logout</button>
  </div>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import { IUserProfile } from '~/../common/transfer/users/user-profile.interface'
import { AuthorizeMixin } from '~/mixins/authorize.mixin'

@Component
export default class extends mixins(AuthorizeMixin) {
  profile: IUserProfile = {
    firstName: '',
    lastName: '',
    email: '',
    countryOfOrigin: '',
    address: ''
  }
  profileSnapshot: IUserProfile = this.profile

  private snapshotProfile() {
    this.profileSnapshot = JSON.parse(JSON.stringify(this.profile))
  }

  get hasChanges() {
    return (Object.keys(this.profile) as (keyof IUserProfile)[]).some(key => this.profile[key] != this.profileSnapshot[key])
  }

  created() {
    this.$usersService.get()
      .then(profile => {
        this.profile = profile
        this.snapshotProfile()
      })
  }

  update() {
    this.$usersService.update(this.profile)
      .then(() => this.snapshotProfile())
  }

  logout() {
    this.$router.push('/auth/logout')
  }
}
</script>

<style lang="scss" scoped>

</style>
