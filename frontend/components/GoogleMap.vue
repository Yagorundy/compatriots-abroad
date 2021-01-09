<template>
  <div id="map" ref="map"></div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'nuxt-class-component'
import { Loader } from '@googlemaps/js-api-loader'

@Component
export default class extends Vue {
  loader!: Loader
  map?: google.maps.Map

  beforeCreate() {
    if (process.client) {
      const apiKey = process.env.googleMapsApiKey
      if (!apiKey) throw new Error('Google maps api key is not present!');
      this.loader = new Loader({ apiKey });

      this.loader.load()
        .then(() => {
          this.map = new google.maps.Map(this.$refs.map as HTMLDivElement, {
            center: { lat: -34.397, lng: 150.644 },
            zoom: 8
          })
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
#map {
  width: 100%;
  height: 100%;
}
</style>
