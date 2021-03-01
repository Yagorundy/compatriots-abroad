<template>
  <div class="header">
    <nav v-if="isAuthorized">
      <!-- TODO: add icons -->
      <!-- TODO: add curves -->
      <div class="col-md-3 col-lg-2 link">
        <nuxt-link to="/">
          {{ siteName }}
        </nuxt-link>
      </div>
      
      <div class="col-md-9 col-lg-10">
        <ul class="col-sm-12 col-md-8 col-lg-6 right">
          <li
            :key="index"
            v-for="(route, index) in routes"
            class="col-sm-4 link"
          >
            <nuxt-link :to="route.to">
              {{ route.text }}
            </nuxt-link>
          </li>
        </ul>
      </div>
    </nav>
    
    <header v-else>
      <h1>{{ siteName }}</h1>
    </header>
  </div>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import { UserMixin } from '~/mixins/user.mixin'

@Component
export default class extends mixins(UserMixin) {
  siteName = 'Compatriots Abroad'
  routes = [
    {
      to: '/search',
      text: 'Search'
    },
    {
      to: '/groups',
      text: 'Groups'
    },
    {
      to: '/users',
      text: 'Profile'
    }
  ]
}
</script>

<style lang="scss" scoped>
div.header {
  margin-bottom: 15px;
  
  nav {
    display: flex;
    flex-wrap: wrap;

    background-color: #08e1ae;
    background-image: linear-gradient(315deg, #08e1ae 0%, #98de5b 74%);    
    
    ul {
      display: flex;
      flex-wrap: wrap;
    }

    .link {
      color: black;
      text-align: center;

      :hover {
        background-color: wheat;
      }

      a {
        display: block;
        padding: 10px;
      }
    }
  }

  header {
    margin-top: 2vh;

    h1 {
      font-weight: 600;
    }
  }
}
</style>
