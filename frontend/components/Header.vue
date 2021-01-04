<template>
  <header>
    <nav>
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
    
    <h1>{{ siteName }}</h1>
  </header>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'nuxt-class-component'

@Component({})
export default class extends Vue {
  siteName = 'Compatriots Abroad'
  // The first route should be '/'
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
header {
  nav {
    display: flex;
    flex-wrap: wrap;

    background: lightgreen;

    ul {
      display: flex;
      flex-wrap: wrap;
    }

    .link {
      color: black;
      text-align: center;
    }
  }
  
  h1 {
    font-family: 'Roboto Slab';
    font-size: 6vw;
    text-align: center;
  }
}
</style>