<template>
  <no-ssr>
    <div id="app">
      <Header />

      <main class="container container-fluid">
        <Nuxt />
      </main>

      <Footer />
    </div>
  </no-ssr>
</template>

<script lang="ts">
import Vue from 'vue'
import Footer from '~/components/Footer.vue'
import Header from '~/components/Header.vue'

export default Vue.extend({
  components: { Header, Footer }
})
</script>

<style lang="scss" scoped>
#app {
  height: 100%;
  display: flex;
  flex-direction: column;

  main {
    height: 100%;
  }
}
</style>
