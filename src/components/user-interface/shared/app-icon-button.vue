<template>
  <div>
    <app-button height="30px" width="30px" v-bind="props">
      <img height="30" width="30" :src="`/public/images/icons/${props.icon}.png`" />
    </app-button>
    <span :class="{ disabled: props.disabled }" v-if="props.label" class="button-label">
      {{ props.label }}
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { AppButtonProps } from './app-button.vue';
import AppButton from './app-button.vue';

interface AppIconButtonProps extends AppButtonProps {
  icon?: string;
}

export default defineComponent({
  components: {
    AppButton,
  },
  setup(props: AppIconButtonProps, { emit }) {
    return {
      props,
      emit,
    };
  },
});
</script>
<style lang="scss" scoped>
img {
  margin-left: -6px;
  margin-top: -1px;
}
.button-label {
  vertical-align: super;
  margin-left: 10px;
  color: #fff;
  position: relative;
  top: -2px;

  &.disabled {
    color: #999;
    cursor: not-allowed;
  }
}
</style>
