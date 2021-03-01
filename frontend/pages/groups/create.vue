<template>
  <div class="container container-with-form">
    <h6>Create Group</h6>

    <form @submit.prevent="createGroup">
      <FormGroup label="Group Name">
        <input v-model="createGroupData.name" />
      </FormGroup>
      <FormGroup label="Description">
        <input v-model="createGroupData.description" />
      </FormGroup>
      <FormGroup label="Country of origin">
        <CountrySelector v-model="createGroupData.countryOfOrigin" />
      </FormGroup>
      <FormGroup label="Address">
        <input v-model="createGroupData.address" />
      </FormGroup>

      <button class="btn btn-primary" type="submit">Create</button>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import { IGroupCreateDto } from '~/../common/transfer/groups/group-create-dto.interface'
import { AuthorizeMixin } from '~/mixins/authorize.mixin'

@Component
export default class extends mixins(AuthorizeMixin) {
  createGroupData: IGroupCreateDto = {
    name: '',
    description: '',
    countryOfOrigin: '',
    address: ''
  }

  async createGroup() {
    await this.$groupsService.create(this.createGroupData)
    this.$router.go(-1)
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin-top: 12vh;
  max-width: 450px;
}
</style>
