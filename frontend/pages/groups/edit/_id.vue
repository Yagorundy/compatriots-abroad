<template>
  <div class="container container-with-form">
    <h6>Edit Group</h6>
    
    <form @submit.prevent="updateGroup">
      <FormGroup label="Group Name">
        <input v-model="updateGroupData.name" />
      </FormGroup>
      <FormGroup label="Description">
        <input v-model="updateGroupData.description" />
      </FormGroup>
      <FormGroup label="Country of origin">
        <CountrySelector v-model="updateGroupData.countryOfOrigin" />
      </FormGroup>
      <FormGroup label="Address">
        <input v-model="updateGroupData.address" />
      </FormGroup>

      <button class="btn btn-primary" type="submit">Save</button>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import { IGroupUpdateDto } from '~/../common/transfer/groups/group-update-dto.interface'
import { AuthorizeMixin } from '~/mixins/authorize.mixin'

@Component
export default class extends mixins(AuthorizeMixin) {
  id: string = ''
  updateGroupData: IGroupUpdateDto = {
    name: '',
    description: '',
    countryOfOrigin: '',
    address: ''
  }

  async created () {
    try {
      this.id = this.$route.params.id
      if (!this.id) throw new Error();
      const group = await this.$groupsService.get(this.$route.params.id)
      if (group.creatorId !== this.userId) throw new Error()
      this.updateGroupData = group
    } catch (_) {
      this.$router.push('/groups')
    }
  }

  async updateGroup() {
    await this.$groupsService.update(this.id, this.updateGroupData)
    this.$router.push('/groups')
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin-top: 12vh;
  max-width: 450px;
}
</style>
