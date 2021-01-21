<template>
  <div class="form-group">
    <label>{{ label }}</label>
    <slot></slot>
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
.form-group {
  display: flex;
  padding: 10px;

  label {
    margin-right: 20px;
  }
}
</style>