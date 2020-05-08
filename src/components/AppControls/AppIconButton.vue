<template>
  <div>
    <app-button height="30px" width="30px" v-bind="props">
      <img height="30" width="30" :src="`/public/images/icons/${props.icon}.png`" />
    </app-button>
    <span v-if="props.label" class="button-label">{{ props.label }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { AppButtonProps } from './AppButton.vue';
import AppButton from './AppButton.vue';

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
  margin-left: -7px;
  margin-top: -1px;
}
.button-label {
  vertical-align: super;
  margin-left: 10px;
  color: #fff;
  position: relative;
  top: -2px;
}
</style>
