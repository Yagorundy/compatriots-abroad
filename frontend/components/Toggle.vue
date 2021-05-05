<template>
  <div class="toggle">
    <div class="toggle-btn" @click="$emit('input', !value)">
      <input
        :id="id"
        type="checkbox"
        :checked="value"
      />
      <span class="slider"></span>
    </div>
    <label :for="id">{{ label }}</label>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class extends Vue {
  @Prop() label!: string;
  @Prop() value!: boolean;

  id: string = ''
  created() {
    this.id = this._uid
  }
}
</script>

<style lang="scss" scoped>
.toggle {
  display: flex;
  align-items: center;

  $btn-width: 36px;
  $btn-height: 20px;
  $btn-border-radius: 30px;
  $btn-padding-h: 2px;
  $slider-size: 16px;
  $btn-padding-v: ($btn-height - $slider-size) / 2;

  .toggle-btn {
    position: relative;
    display: inline-block;
    width: $btn-width;
    height: $btn-height;

    input {
      opacity: 0;
      width: 0;
      height: 0;
    }

    .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #ccc;
      border-radius: $btn-border-radius;
      -webkit-transition: .4s;
      transition: .4s;

      &::before {
        position: absolute;
        content: "";
        height: $slider-size;
        width: $slider-size;
        left: $btn-padding-h;
        bottom: $btn-padding-v;
        background-color: white;
        border-radius: 50%;
        -webkit-transition: .4s;
        transition: .4s;
      }
    }

    input:checked + span {
      background-color: #2196F3;
    }

    input:focus + span {
      box-shadow: 0 0 1px #2196F3;
    }

    input:checked + span::before {
      $slider-distance: $btn-width - $slider-size - 2 * $btn-padding-h;
      -webkit-transform: translateX($slider-distance);
      -ms-transform: translateX($slider-distance);
      transform: translateX($slider-distance);
    }
  }

  label {
    display: block;
    margin-left: 5px;
    cursor: pointer;
  }
}
</style>
