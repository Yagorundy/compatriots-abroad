<template>
  <div id="overview">
    <header>
      <h4>Hi {{ username }}!</h4>
    </header>
    
    <div id="content" class="container-spaced-horizontal">
      <div id="map-menu">
        <p>Select a country and see the people from it.</p>

        <select
          id="country-selector"
          v-model="selectedCountryCode"
        >
          <option disabled :selected="!selectedCountryCode" value>No country selected</option>
          <option
            :key="index"
            v-for="(country, index) in countries"
            :value="country.code"
            :selected="selectedCountryCode === country.code"
          >{{ country.name }}</option>
        </select>
      </div>

      <div id="map-container">
        <google-map />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'nuxt-class-component'
import GoogleMap from '~/components/GoogleMap.vue'
import countries from '~/static/countries.json'

@Component
export default class extends Vue {
  username = '{username}'
  
  countries = countries
  selectedCountryCode = ''
}
</script>

<style lang="scss" scoped>
#overview {
  header {
    margin-bottom: 20px;
  }

  #content {
    > * {
      margin-bottom: 20px;
    }

    #map-menu {
      margin-left: auto;
      margin-right: auto;

      display: flex;
      flex-flow: column;
      align-items: center;
    }
    
    #map-container {
      height: 30em;
    }
  } 
}
</style>