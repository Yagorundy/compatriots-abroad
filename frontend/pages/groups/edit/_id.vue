<template>
  <div class="container">
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

      <button type="submit">Save</button>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import { IGroupUpdateDto } from '~/../common/transfer/groups/group-update-dto.interface'
import { AuthorizeMixin } from '~/mixins/authorize.mixin'

@Component
export default class extends mixins(AuthorizeMixin) {
  updateGroupData: IGroupUpdateDto = {
    name: '',
    description: '',
    countryOfOrigin: '',
    address: ''
  }

  async created () {
    try {
      const id = this.$route.params.id
      if (!id) throw new Error();
      this.updateGroupData = await this.$groupsService.get(this.$route.params.id)
    } catch (_) {
      this.$router.push('/groups')
    }
  }

  async updateGroup() {
    await this.$groupsService.update(this.updateGroupData)
    this.$router.push('/groups')
  }
}
</script>

<style lang="scss" scoped>

</style>
