<template>
  <div class="container">
    <h4>Search groups</h4>
    <div class="container search-container">
      <div class="menu">
        <input
          class="search-input"
          placeholder="Search"
          v-model="searchData.text"
        />
        <CountrySelector
          class="search-country"
          v-model="searchData.countryOfOrigin"
        ></CountrySelector>
      </div>
      <div class="container results">
        <div v-if="seachGroups.length">
          <ul>
            <li
              :key="index"
              v-for="(group, index) in seachGroups"
              class="result"
            >
              <nuxt-link :to="`/groups/${group.id}`">
                <span class="col-sm-12 col-md-4 col-lg-3">{{ group.name }}</span>
                <span class="col-sm-12 col-md-8 col-lg-9">{{ group.description }}</span>
              </nuxt-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, mixins, Watch } from 'nuxt-property-decorator'
import { IMeilisearchGroup } from '~/../common/transfer/meilisearch/meilisearch-group-dto.interface'
import { AuthorizeMixin } from '~/mixins/authorize.mixin'

@Component
export default class extends mixins(AuthorizeMixin) {
  searchData = {
    text: '',
    countryOfOrigin: undefined
  }

  seachGroups: IMeilisearchGroup[] = []

  @Watch('searchData', { deep: true })
  async search() {
    this.seachGroups = await this.$meilisearchService.searchGroups(this.searchData.text, this.searchData.countryOfOrigin)
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/abstracts/variables';

h4 {
  margin-bottom: 20px;
}

.search-container {
  .menu {
    display: flex;
    flex-direction: column;
    
    .search-input {
      text-align: center;
      margin-bottom: 10px;
    }

    @media screen and (min-width: map-get($grid-breakpoints, $grid-bp-sm)) {
      flex-direction: row;
      align-items: center;

      .search-input {
        margin-bottom: 0;
        width: 60%;
        padding-right: 20px;
      }
      .search-country {
        margin-left: auto;
        width: 35%;
      }
    }
  }
  .results {
    height: 100%;
    max-height: 50vh;
    margin-top: 30px;

    .result {
      padding: 5px;
      margin-bottom: 10px;
      border: 1px dashed darkgreen;

      a {
        display: flex;
        flex-wrap: wrap;

        span {
          display: inline-block;
        }
      }
    }
  }
}
</style>
