<template>
  <div id="groups" class="container--fluid">
    <div class="col-sm-12 col-md-6">
      <div class="container">
        <h6>Groups I like</h6>
        <div v-if="groupsILike.length" class="groups-container">
          <p
            :key="index"
            v-for="(group, index) in groupsILike"
          ><nuxt-link :to="`/groups/${group.id}`">{{ group.name }}</nuxt-link></p>
        </div>
        <button class="group-action-button"><nuxt-link to="/search?groups=true">Find a group</nuxt-link></button>
      </div>
    </div>
    <div class="col-sm-12 col-md-6">
      <div class="container">
        <h6>My groups</h6>
        <ul v-if="myGroups.length" class="groups-list">
          <li
            :key="index"
            v-for="(group, index) in myGroups"
          >
            <nuxt-link :to="`/groups/${group.id}`">{{ group.name }}</nuxt-link>
            <button class="delete-btn" @click="deleteGroup(group.id)">delete</button>
          </li>
        </ul>
        <button class="group-action-button"><nuxt-link to="/groups/create">Create a group</nuxt-link></button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import { IGroupInfoDto } from '~/../common/transfer/groups/group-info-dto.interface'
import { AuthorizeMixin } from '~/mixins/authorize.mixin'

@Component
export default class extends mixins(AuthorizeMixin) {
  myGroups: IGroupInfoDto[] = []
  groupsILike: IGroupInfoDto[] = []

  async created () {
    const { myGroups, groupsILike } = await this.$groupsService.getGroupsForUser()
    this.myGroups = myGroups
    this.groupsILike = groupsILike
  }

  async deleteGroup (id: string) {
    await this.$groupsService.delete(id)
    const index = this.myGroups.findIndex(g => g.id === id)
    if (index !== -1) {
      this.myGroups.splice(index, 1)
    }
  }
}
</script>

<style lang="scss" scoped>
#groups {
  display: flex;

  .groups-list {
    margin-top: 20px;
    list-style-type: none;

    li {
      display: flex;
      justify-content: center;

      .delete-btn {
        margin-left: 5px;
      }
    }
  }

  .group-action-button {
    display: block;
    margin: 10px auto;
  }
}
</style>
