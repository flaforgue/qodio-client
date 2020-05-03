<template>
  <div class="app-known-resource-controls">
    <h3>Resource</h3>
    <p>Available units: {{ props.data.stock }} / {{ props.data.initialStock }}</p>
    <app-icon-button
      :backgroundColor="colors.actions.collect.hex"
      :color="colors.white.hex"
      icon="build"
      @click="handleKnownResourceBuild"
    />
    <span class="button-label">Build</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Resource } from 'src/types';
import AppIconButton from './AppIconButton.vue';
import { colors } from '../../enums';

type AppKnownResourceControlsProps = {
  data: Resource;
};

export default defineComponent({
  components: { AppIconButton },
  setup(props: AppKnownResourceControlsProps, { emit }) {
    const handleKnownResourceBuild = (): void => {
      emit('build', props.data.id);
    };

    return {
      props,
      colors,
      handleKnownResourceBuild,
    };
  },
});
</script>
<style lang="scss" scoped>
.button-label {
  vertical-align: super;
  margin-left: 10px;
  color: #fff;
}
</style>
