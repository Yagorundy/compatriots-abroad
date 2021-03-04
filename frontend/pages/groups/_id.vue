<template>
  <div v-show="!isLoading" class="container">
    <h6>{{ group.name }}</h6>
    <div class="description-box">
      <p class="description">{{ group.description }}</p>
    </div>
    <div class="details">
      <p>Country of origin: {{ group.countryOfOrigin }}</p>
      <p>Address: {{ group.address }}</p>
      
      <div v-if="group.creatorId === userId" class="buttons flex">
        <nuxt-link class="btn btn-secondary" :to="`/groups/edit/${group.id}`">Edit</nuxt-link>
        <button class="btn btn-danger" @click="deleteGroup">Delete</button>
      </div>
      <div v-else class="buttons">
        <button class="btn btn-secondary" @click="group.isLiked ? unlike() : like()">{{ group.isLiked ? 'Unlike' : 'Like' }}</button>
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
  isLoading = true
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
    } finally {
      this.isLoading = false
    }
  }

  async like() {
    await this.$groupsService.like(this.group.id)
    this.group.isLiked = true
  }

  async unlike() {
    await this.$groupsService.unlike(this.group.id)
    this.group.isLiked = false
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
  .buttons {
      margin-top: 10px;
      
    .btn-danger {
      margin-left: 5px;
    }
  }
}
</style>
