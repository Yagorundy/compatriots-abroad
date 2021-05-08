<template>
  <div id="map-container" :style="{ height: (isAuthorized ? 70 : 65) + 'vh' }">
    <div class="map-menu" :style="{ 'border-radius': borderRadius }">
      <div class="map-menu--left">
        <Toggle label="Show Users" v-model="showUsers" class="users-toggle" />
        <Toggle label="Show Groups" v-model="showGroups" />
      </div>
      <div class="map-menu--right">
        <CountrySelector
          v-model="selectedCountryCode"
          :disabled="areMarkersLoading"
          :borderRadius="borderRadius"
        />
      </div>
    </div>
    <div id="map" ref="map"></div>
  </div>
</template>

<script lang="ts">
import { Component, mixins, Watch } from 'nuxt-property-decorator'
import { Loader } from '@googlemaps/js-api-loader'
import { countries, countriesByCode } from '~/../common/constants/countries.constants'
import { UserMixin } from '~/mixins/user.mixin'
import { ICoordinatesDto } from '~/../common/transfer/coordinates/coordinates-dto.interface'

type MarkerType = 'user' | 'group'

@Component
export default class extends mixins(UserMixin) {
  borderRadius = '20px'

  countries = countries
  selectedCountryCode = ''
  areMarkersLoading = false
  coordinates: { [key in MarkerType]?: ICoordinatesDto[] } = { }
  markers: { [key in MarkerType]: google.maps.Marker[] } = { user: [], group: [] }

  loader!: Loader
  initMapPromise!: Promise<any>
  map?: google.maps.Map

  showUsers = true
  showGroups = true

  private hideMarkers(type: MarkerType) {
    this.markers[type].forEach(m => m.setMap(null))
  }

  private async showMarkers(type: MarkerType) {
    if (this.coordinates[type] === undefined) {
      this.coordinates[type] = await this.$locationsService.getCoordinates(this.selectedCountryCode, type === 'user' ? 'users' : 'groups');
    }
    this.markers[type] = this.coordinates[type]!.map(coords => new google.maps.Marker({ position: coords, map: this.map }))
  }

  @Watch('showUsers')
  async setUserMarkers() {
    if (this.showUsers) await this.showMarkers('user');
    else this.hideMarkers('user')
  }

  @Watch('showGroups')
  async setGroupMarkers() {
    if (this.showGroups) await this.showMarkers('group');
    else this.hideMarkers('group')
  }

  private removeMarkers() {
    this.coordinates = {}
    this.hideMarkers('user')
    this.hideMarkers('group')
  }

  @Watch('selectedCountryCode')
  async onSelectedCountryCodeChanged() {
    this.areMarkersLoading = true
    this.map?.setCenter(countriesByCode[this.selectedCountryCode])
    this.removeMarkers()
    await Promise.all([this.setUserMarkers(), this.setGroupMarkers()])    
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
    const apiKey = this.$config.googleMapsApiKey
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
      // countryCode = this.$jwtService.getTokenPayload()?.countryOfOrigin
    }
    if (!countryCode && navigator.geolocation) {
      const location = await new Promise<ICoordinatesDto>((res, rej) =>
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
@import '~/assets/scss/abstracts/variables';

@mixin map-menu-style {
  background: #fff;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2), 0 -1px 0px rgba(0,0,0,0.02);
}

#map-container {
  position: relative;

  .map-menu {
    position: absolute;
    display: flex;
    z-index: 1;

    top: 10px;
    left: 10px;
    right: 10px;

    @media screen and (max-width: map-get($grid-breakpoints, $grid-bp-sm) - 1px) {
      flex-flow: column;
      @include map-menu-style();
    }

    &--left {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;

      margin-bottom: 10px;
      @media screen and (min-width: map-get($grid-breakpoints, $grid-bp-sm)) {
        border-radius: inherit;
        @include map-menu-style();
        margin-bottom: 0;
        .users-toggle {
          margin-right: 20px;
        }
      }
    }

    &--right {
      @media screen and (min-width: map-get($grid-breakpoints, $grid-bp-sm)) {
        border-radius: inherit;
        @include map-menu-style();
        margin-left: auto;
      }
    }
  }

  #map {
    width: 100%;
    height: 100%;
    border-radius: 20px;
  }
}
</style>
