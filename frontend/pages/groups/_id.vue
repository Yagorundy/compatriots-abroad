<template>
  <div class="container">
    TODO
    Add group view and edit (if group owner)
    {{ groupData }}
  </div>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import { IGroupInfoDto } from '~/../common/transfer/groups/group-info-dto.interface'
import { AuthorizeMixin } from '~/mixins/authorize.mixin'

@Component
export default class extends mixins(AuthorizeMixin) {
  groupData: IGroupInfoDto = {
    id: '',
    name: ''
  }

  async created () {
    this.groupData = await this.$groupsService.getGroup(this.$route.params.id)
  }
}
</script>

<style lang="scss" scoped>

</style>
