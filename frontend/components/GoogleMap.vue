<template>
  <div id="map-container">
    <div id="map-menu">
      <select
        id="country-selector"
        v-model="selectedCountryCode"
      >
        <option disabled :selected="!selectedCountryCode" value>Choose a country</option>
        <option
          :key="index"
          v-for="(country, index) in countries"
          :value="country.code"
          :selected="selectedCountryCode === country.code"
        >{{ country.name }}</option>
      </select>
    </div>
    <div id="map" ref="map"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import countries from '~/static/countries.json'
import { Loader } from '@googlemaps/js-api-loader'

@Component
export default class extends Vue {
  countries = countries
  selectedCountryCode = ''

  loader!: Loader
  map?: google.maps.Map

  beforeCreate() {
    if (process.client) {
      const apiKey = process.env.googleMapsApiKey
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
  height: 30em;

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
