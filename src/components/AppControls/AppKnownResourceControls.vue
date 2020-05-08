<template>
  <div class="app-known-resource-controls">
    <h3>Resource</h3>
    <p>Available units: {{ props.data.stock }} / {{ props.data.initialStock }}</p>
    <app-icon-button
      :backgroundColor="colors.actions.collect.hex"
      :color="colors.white.hex"
      :disabled="props.currentStock < buildingResourceCost"
      icon="build"
      label="Build"
      @app-click="handleBuildingCreate"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Resource } from 'src/types';
import AppIconButton from './AppIconButton.vue';
import { colors } from '../../enums';
import config from '../../config';

type AppKnownResourceControlsProps = {
  data: Resource;
  currentStock: number;
};

export default defineComponent({
  components: { AppIconButton },
  setup(props: AppKnownResourceControlsProps, { emit }) {
    const handleBuildingCreate = (): void => {
      emit('building-create', props.data.id);
    };

    return {
      props,
      colors,
      handleBuildingCreate,
      buildingResourceCost: config.buildingResourceCost,
    };
  },
});
</script>
