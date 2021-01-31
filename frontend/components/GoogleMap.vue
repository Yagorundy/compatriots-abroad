<template>
  <div id="map-container">
    <div id="map-menu">
      <CountrySelector v-model="selectedCountryCode" />
    </div>
    <div id="map" ref="map"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Loader } from '@googlemaps/js-api-loader'
import { countries } from '~/../common/constants/countries.constant'

@Component
export default class extends Vue {
  countries = countries
  selectedCountryCode = ''

  loader!: Loader
  map?: google.maps.Map

  beforeCreate() {
    if (process.client) {
      const apiKey = process.env.GOOGLE_MAPS_API_KEY
      if (!apiKey) throw new Error('Google maps api key is not present!');
      this.loader = new Loader({ apiKey,  });

      this.loader.load()
        .then(() => {
          this.map = new google.maps.Map(this.$refs.map as HTMLDivElement, {
            fullscreenControl: false,
            center: { lat: -34.397, lng: 150.644 },
            zoom: 8,
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
#map-container {
  position: relative;
  height: 65vh;

  #map-menu {
    position: absolute;
    display: flex;
    right: 10px;
    top: 10px;
    z-index: 1;

    background: #fff;
    padding: 10px;
    border-radius: 2px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2), 0 -1px 0px rgba(0,0,0,0.02);
  }

  #map {
    width: 100%;
    height: 100%;
  }
}
</style>
