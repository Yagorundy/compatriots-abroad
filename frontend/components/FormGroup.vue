<template>
  <div class="form-group">
    <label>{{ label }}</label>
    <div class="form-group--inner">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class extends Vue {
  @Prop() label?: string;
}
</script>

<style lang="scss">
@import '~/assets/scss/abstracts/variables';

.form-group {
  display: flex;
  flex-direction: column;
  padding: 10px;

  .form-group--inner {
    width: 100%;
  }

  @media screen and (min-width: map-get($grid-breakpoints, $grid-bp-sm)) {
    flex-direction: row;
    align-items: center;

    label {
      width: 30%;
      text-align: right;
      padding-right: 20px;
    }
    .form-group--inner {
      width: 70%;
    }
  }
}
</style>
