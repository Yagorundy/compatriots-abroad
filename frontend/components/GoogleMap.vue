<template>
  <div id="map-container">
    <div id="map-menu">
      <CountrySelector v-model="selectedCountryCode" :disabled="areMarkersLoading" />
    </div>
    <div id="map" ref="map"></div>
  </div>
</template>

<script lang="ts">
import { Component, mixins, Watch } from 'nuxt-property-decorator'
import { Loader } from '@googlemaps/js-api-loader'
import { countries, countriesByCode } from '~/../common/constants/countries.constants'
import { UserMixin } from '~/mixins/user.mixin'
import { ILocationDto } from '~/../common/transfer/locations/location-dto.interface'

type MarkerType = 'user' | 'group'

@Component
export default class extends mixins(UserMixin) {
  countries = countries
  selectedCountryCode = ''
  areMarkersLoading = false
  markers: { [key in MarkerType]: google.maps.Marker[] } = { user: [], group: [] }

  loader!: Loader
  initMapPromise!: Promise<any>
  map?: google.maps.Map

  async setMarkers(type: MarkerType) {
    this.markers[type].forEach(m => m.setMap(null))
    const locations = await this.$locationsService.getLocations(this.selectedCountryCode, type === 'user' ? 'users' : 'groups')
    this.markers[type] = locations.map(loc => new google.maps.Marker({ position: loc, map: this.map }))
  }

  @Watch('selectedCountryCode')
  async onSelectedCountryCodeChanged() {
    this.areMarkersLoading = true
    this.map?.setCenter(countriesByCode[this.selectedCountryCode])
    await Promise.all([
      this.setMarkers('user'),
      this.setMarkers('group')
    ])    
    this.areMarkersLoading = false
  }

  async created() {
    try {
      const [, userCountryCode] = await Promise.all([
        this.initGoogleMap(),
        this.getUserCountryCode()
      ])
      if (userCountryCode) {
        const userLocation = countriesByCode[userCountryCode]
        if (userLocation) {
          this.selectedCountryCode = userCountryCode
        }
      }
    } catch (err) {
      console.log(err)
    }
  }

  async initGoogleMap() {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY
    if (!apiKey) throw new Error('Google maps api key is not present!')
    this.loader = new Loader({ apiKey })

    await this.loader.load()
    this.map = new google.maps.Map(this.$refs.map as HTMLDivElement, {
      fullscreenControl: false,
      mapTypeControl: false,
      center: { lat: 54.5260, lng: 15.2551 },
      zoom: 4
    })
  }

  async getUserCountryCode(): Promise<string | undefined> {
    let countryCode: string | undefined
    if (this.isAuthorized) {
      countryCode = this.$jwtService.getTokenPayload()?.countryOfOrigin
    }
    if (!countryCode && navigator.geolocation) {
      const location = await new Promise<ILocationDto>((res, rej) =>
        navigator.geolocation.getCurrentPosition(
          position => res({ lat: position.coords.latitude, lng: position.coords.longitude }),
          rej
        )
      )
      countryCode = await this.$locationsService.getCountryCodeByLocation(location)
    }
    return countryCode
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
