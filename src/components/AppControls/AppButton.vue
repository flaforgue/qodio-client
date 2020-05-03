<template>
  <button
    type="button"
    class="app-button"
    :style="{
      backgroundColor: props.backgroundColor,
      color: props.color,
      height: props.height,
      width: props.width,
      fontSize: props.fontSize,
    }"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export interface AppButtonProps {
  backgroundColor: string;
  color: string;
  label: string;
}

export default defineComponent({
  setup(props: AppButtonProps, { slots }) {
    return {
      props,
      slots,
    };
  },
});
</script>

<style lang="scss" scoped>
.app-button {
  color: #fff;
  font-size: 24px;
  line-height: 21px;
  border-radius: 30px;
  border: none;
  cursor: pointer;
  transform: scale(1);
  transition: transform 0.2s;
  transform-origin: center;
  outline: none !important;

  &:hover {
    transform: scale(1.1);
  }

  &:active {
    transform: scale(1.5);
  }
}
</style>
