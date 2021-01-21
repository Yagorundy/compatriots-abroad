<template>
  <div class="header">
    <nav>
      <!-- TODO: add icons -->
      <!-- TODO: add curves -->
      <div class="col-md-3 col-lg-2 link">
        <nuxt-link :to="routes[0].to">
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
    
    <header>
      <h1>{{ siteName }}</h1>
    </header>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class extends Vue {
  siteName = 'Compatriots Abroad'
  routes = [
    {
      to: '/',
      text: 'Overview'
    },
    {
      to: '/search',
      text: 'Search'
    },
    {
      to: '/profile',
      text: 'Profile'
    }
  ]
}
</script>

<style lang="scss" scoped>
div.header {
  margin-bottom: 30px;
  
  nav {
    display: flex;
    flex-wrap: wrap;

    margin-bottom: 20px;
    background: lightgreen;

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
    h1 {
      font-weight: 600;
    }
  }
}
</style>