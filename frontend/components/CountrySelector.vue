<template>
  <div class="country-selector">
    <input
      :ref="INPUT_REF_KEY"
      class="input"
      placeholder="Select a country"
      v-model="countryName"
      :disabled="disabled"
      :readonly="!showDropdown"
      :style="{ 'border-radius': borderRadius }"
      @input="handleInput"
      @click="onInputClicked"
    />
    <ul
      v-show="showDropdown"
      class="dropdown"
      :style="{ width: this.dropdownWidth + 'px' }"
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
import { Component, Prop, Vue, Watch } from 'nuxt-property-decorator'
import { countries, countriesByCode } from '~/../common/constants/countries.constants'

@Component
export default class extends Vue {  
  @Prop({ required: true }) value!: string
  @Prop() disabled?: boolean
  @Prop() borderRadius?: string

  countryName = ''
  showDropdown = false
  useInputAsFilter = false

  INPUT_REF_KEY = 'country-input'
  get input() {
    return this.$refs[this.INPUT_REF_KEY] as HTMLElement
  }

  dropdownWidth: number | null = null;
  resizeDropdown() {
    if (this.dropdownWidth !== this.input.clientWidth) {
      this.dropdownWidth = this.input.clientWidth;
    }
  }

  mounted() {
    this.resizeDropdown()
    window.addEventListener('resize', this.resizeDropdown)
  }
  destroyed() {
    window.removeEventListener('resize', this.resizeDropdown)
  }

  @Watch('value', { immediate: true })
  onValueUpdated() {
    const country = countriesByCode[this.value]
    if (country) {
      this.countryName = country.name
    }
  }

  get countries() {
    if (this.useInputAsFilter) {
      const nameToLower = this.countryName.toLowerCase()
      return countries.filter(c => c.name.toLowerCase().includes(nameToLower))
    }
    return countries
  }

  handleInput() {
    if (this.countryName === '') {
      this.emitCountryCode('')
    }
    this.showDropdown = true
    this.useInputAsFilter = true
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
    this.showDropdown = false
    if (this.value === country.code) return
    this.emitCountryCode(country.code)
  }

  emitCountryCode(countryCode: string) {
    this.$emit('input', countryCode)
  }
}
</script>

<style lang="scss" scoped>

.country-selector {
  .input {
    padding: 2px 4px;
    text-align: center;
  }

  .dropdown {
    position: absolute;
    max-height: 200px;
    overflow-x: auto;
    list-style-type: none;
    padding: 10px 20px 10px 0;
    background-color: white;
    box-shadow: 0 2px 20px 9px rgba(31, 31, 31, 0.04);
    border: none;

    li {
      width: 100%;
      cursor: pointer;
      font-size: 14px;
      color: black;
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
        color: #923CB5;
        background-color: #f8f9fa;
        border-left: 4px solid white;
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
