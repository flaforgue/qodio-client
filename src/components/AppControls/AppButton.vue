<template>
  <button
    type="button"
    class="app-button"
    :class="{ disabled: props.disabled }"
    :style="{
      backgroundColor: props.backgroundColor,
      color: props.color,
      height: props.height,
      width: props.width,
      fontSize: props.fontSize,
    }"
    @click="handleClick"
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
  disabled?: boolean;
}

export default defineComponent((props: AppButtonProps, { slots, emit }) => {
  const handleClick = (): void => {
    if (!props.disabled) {
      emit('app-click');
    }
  };

  return {
    props,
    slots,
    handleClick,
  };
});
</script>

<style lang="scss" scoped>
.app-button {
  color: #fff;
  font-size: 24px;
  line-height: 21px;
  border-radius: 30px;
  border: none;
  transform: scale(1);
  transition: transform 0.2s;
  transform-origin: center;
  outline: none !important;

  &:not(.disabled) {
    cursor: pointer;

    &:hover {
      transform: scale(1.1);
    }

    &:active {
      transform: scale(1.5);
    }
  }

  &.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
</style>
