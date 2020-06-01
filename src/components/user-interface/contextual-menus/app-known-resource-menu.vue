<template>
  <div class="app-known-resource-menu">
    <h3>Resource</h3>
    <p>Available units: {{ props.data.stock }} / {{ props.data.initialStock }}</p>
    <app-icon-button
      :backgroundColor="colors.actions.collect.hex"
      :color="colors.white.hex"
      :disabled="props.currentStock < config.buildingCreationResourceCost"
      icon="build"
      label="Build"
      @app-click="emit('building-create')"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Resource } from 'src/types';
import AppIconButton from '../shared/app-icon-button.vue';
import { colors } from 'src/enums';
import config from 'src/config';

type AppKnownResourceMenuProps = {
  data: Resource;
  currentStock: number;
};

export default defineComponent({
  components: { AppIconButton },
  setup(props: AppKnownResourceMenuProps, { emit }) {
    return {
      emit,
      props,
      colors,
      config,
    };
  },
});
</script>
