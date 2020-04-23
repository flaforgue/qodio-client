<template>
  <button type="button" class="app-button" :style="{ backgroundColor: props.color }">
    {{ props.label }}
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

type AppButtonProps = {
  color: string;
  label: string;
};

export default defineComponent({
  setup(props: AppButtonProps) {
    return {
      props,
    };
  },
});
</script>

<style lang="scss" scoped>
.app-button {
  color: #fff;
  font-size: 24px;
  line-height: 21px;
  margin: 20px;
  height: 30px;
  width: 30px;
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
