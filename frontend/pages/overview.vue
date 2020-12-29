<template>
  <div>
    <h1>Overview</h1>
    <google-map />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import GoogleMap from '../components/GoogleMap.vue'

export default Vue.extend({
  components: { GoogleMap }
})
</script>
