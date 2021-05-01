<template>
  <div id="groups" class="container--fluid">
    <div class="col-sm-12 col-md-6">
      <div class="container">
        <h6>Groups I like</h6>
        <ul v-if="groupsILike.length" class="groups-list">
          <li
            :key="index"
            v-for="(group, index) in groupsILike"
          >
            <nuxt-link class="link" :to="`/groups/${group.id}`">{{ group.name }}</nuxt-link>
          </li>
        </ul>
        <button class="btn btn-secondary group-action-button"><nuxt-link to="/search">Find a group</nuxt-link></button>
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
            <nuxt-link class="link" :to="`/groups/${group.id}`">{{ group.name }}</nuxt-link>
          </li>
        </ul>
        <button class="btn btn-secondary group-action-button"><nuxt-link to="/groups/create">Create a group</nuxt-link></button>
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

      .link {
        margin-top: 5px;
        padding: 0 4px;
        border-left: 2px solid black;
        border-right: 2px solid black;
      }
    }
  }

  .group-action-button {
    display: block;
    margin: 10px auto;
  }
}
</style>
