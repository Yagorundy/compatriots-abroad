<template>
  <div>
    <select
      id="country-select"
      v-model="selectedCountryCode"
    >
      <option disabled :selected="!selectedCountryCode">Select a country</option>
      <option
        :key="index"
        v-for="(country, index) in countries"
        :value="country.code"
        :selected="selectedCountryCode === country.code"
      >{{ country.name }}</option>
    </select>

    {{ selectedCountryCode }}

    <google-map />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'nuxt-class-component'
import GoogleMap from '~/components/GoogleMap.vue'
import countries from '~/static/countries.json'

@Component({})
export default class extends Vue {
  countries = countries
  selectedCountryCode = ''
}
</script>
