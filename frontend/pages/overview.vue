<template>
  <div id="overview">
    <header>
      <h6>The website that connects you with your people! Sign up <nuxt-link to="/signup">here</nuxt-link> and find people and groups abroad.</h6>
      <h4>Hi {{ username }}!</h4>
    </header>
    
    <main class="container-spaced-horizontal">
      <GoogleMap />
    </main>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'nuxt-class-component'

@Component
export default class extends Vue {
  username = '{username}'

  async created() {

  }
}
</script>

<style lang="scss" scoped>
#overview {
  header {
    margin-bottom: 20px;

    h6 {

      a {
        text-decoration: underline;
        color: green;
      }
    }
  }

  main {
    margin-bottom: 20px;
  }
}
</style>