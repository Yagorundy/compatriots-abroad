<template>
  <div class="container container-with-form">
    <h6>Profile</h6>
    
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

      <button
        type="submit"
        class="btn btn-primary"
        :disabled="!hasChanges"
      >Save</button>

      <button
        id="logout-btn"
        class="btn btn-danger"
        type="button"
        @click="logout"
      >Logout</button>
    </form>    
  </div>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import { IUserProfileDto } from '~/../common/transfer/users/user-profile-dto.interface'
import { AuthorizeMixin } from '~/mixins/authorize.mixin'

@Component
export default class extends mixins(AuthorizeMixin) {
  profile: IUserProfileDto = {
    firstName: '',
    lastName: '',
    email: '',
    countryOfOrigin: '',
    address: ''
  }
  profileSnapshot: IUserProfileDto = this.profile

  private snapshotProfile() {
    this.profileSnapshot = JSON.parse(JSON.stringify(this.profile))
  }

  get hasChanges() {
    return (Object.keys(this.profile) as (keyof IUserProfileDto)[]).some(key => this.profile[key] != this.profileSnapshot[key])
  }

  created() {
    this.$usersService.get()
      .then(profile => {
        this.profile = profile
        this.snapshotProfile()
      })
  }

  async update() {
    await this.$usersService.update(this.profile)
    this.$jwtService.setToken
    this.snapshotProfile()
  }

  logout() {
    this.$router.push('/auth/logout')
  }
}
</script>

<style lang="scss" scoped>
.container {
  max-width: 500px;
  margin-top: 10vh;

  #logout-btn {
    float: right;
  }
}

</style>
