<template>
  <div class="country-selector">
    <input
      class="input"
      placeholder="Select a country"
      v-model="countryName"
      :readonly="!showDropdown"
      @input="showDropdown = true; useInputAsFilter = true"
      @click="onInputClicked"
    />
    <ul
      v-show="showDropdown"
      class="dropdown"
    >
      <li
        :key="index"
        v-for="(country, index) in countries"
        :class="{ selected: country.code === value }"
        :content="country.name"
        @click="selectCountry(country)"
      >{{ country.name }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { countries } from '~/../common/constants/countries.constant'

@Component
export default class extends Vue {  
  @Prop({ required: true }) value!: string
  @Prop() disabled?: boolean

  countryName = ''
  showDropdown = false
  useInputAsFilter = false

  get countries() {
    if (this.useInputAsFilter) {
      const nameToLower = this.countryName.toLowerCase()
      return countries.filter(c => c.name.toLowerCase().includes(nameToLower))
    }
    return countries
  }

  onInputClicked(event: Event) {
    this.showDropdown = !this.showDropdown
    this.useInputAsFilter = false
    if (this.showDropdown) {
      const inputEl = event.target as HTMLInputElement
      inputEl.setSelectionRange(0, inputEl.value.length)
    }
  }

  selectCountry(country: typeof countries[number]) {
    this.countryName = country.name
    this.showDropdown = false
    if (this.value === country.code) return
    this.$emit('input', country.code)
  }
}
</script>

<style lang="scss" scoped>
$white: white;
$default-dark: red;
$main: green;


.country-selector {
  .input {
    cursor: pointer;
    padding: 2px 4px;
  }

  .dropdown {
    position: absolute;
    width: 90%;
    max-height: 200px;
    overflow-x: auto;
    list-style-type: none;
    padding: 10px 20px 10px 0;

    background-color: $white;
    box-shadow: 0 2px 20px 9px rgba(31, 31, 31, 0.04);
    border: none;

    li {
      width: 100%;
      cursor: pointer;
      font-size: 14px;
      color: $default-dark;
      text-align: left;
      background: transparent;
      border: none;
      display: block;
      margin: 0px 0px 0px 0px;
      padding: 3px 0px 3px 20px;
      min-width: 0px;
      max-width: unset;

      &:hover, &.selected {
        font-weight: bold;
      }

      &.selected {
        padding-left: 16px;
        color: $main;
        background-color: #f8f9fa;
        border-left: 4px solid $main;
      }
      
      &::after {
        display: block;
        content: attr(content);
        font-weight: bold;
        height: 1px;
        color: transparent;
        overflow: hidden;
        visibility: hidden;
      }
    }
  }
}
</style>
