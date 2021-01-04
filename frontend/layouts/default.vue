<template>
  <no-ssr>
    <div id="app">
      <Header />

      <main>
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