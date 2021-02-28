<template>
  <div class="container">
    <h6>{{ group.name }}</h6>
    <div class="description-box">
      <p class="description">{{ group.description }}</p>
    </div>
    <div class="details">
      <p>Country of origin: {{ group.countryOfOrigin }}</p>
      <p>Address: {{ group.address }}</p>
      
      <div v-if="group.creatorId === userId">
        <nuxt-link :to="`/groups/edit/${group.id}`">Edit</nuxt-link>
        <button @click="deleteGroup">Delete</button>
      </div>
      <div v-else>
        <button>{{ group.isLiked ? 'Unlike' : 'Like' }}</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import { IGroupDto } from '~/../common/transfer/groups/group-dto.interface'
import { AuthorizeMixin } from '~/mixins/authorize.mixin'

@Component
export default class extends mixins(AuthorizeMixin) {
  group: IGroupDto = {
    id: '',
    creatorId: '',
    isLiked: false,
    name: '',
    description: '',
    countryOfOrigin: '',
    address: ''
  }

  goToGroupsPage() {
    this.$router.push('/groups')
  }

  async created () {
    try {
      const id = this.$route.params.id
      if (!id) throw new Error();
      this.group = await this.$groupsService.get(this.$route.params.id)
    } catch (_) {
      this.goToGroupsPage()
    }
  }

  async deleteGroup () {
    await this.$groupsService.delete(this.group.id)
    this.goToGroupsPage()
  }
}
</script>

<style lang="scss" scoped>
.description-box {
  margin-top: 5px;

  .description {
    text-align: center;
    font-style: italic;
  }
}

.details {
  p {

  }
}
</style>
