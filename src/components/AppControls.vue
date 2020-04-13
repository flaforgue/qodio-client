<template>
  <div class="app-controls">
    <app-progress-bar
      class="app-control"
      :color="populationColor"
      :emptyColor="emptyPopulationColor"
      :value="props.population"
      :max="props.maxPopulation"
    />
    <app-progress-bar
      class="app-control"
      :color="resourceColor"
      :emptyColor="emptyResourceColor"
      :value="props.stock"
      :max="props.maxStock"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import colors from '../enums/colors';
import AppProgressBar from './AppControls/AppProgressBar.vue';
import { getColor } from '../utils';

type AppControlsProps = {
  stock: number;
  maxStock: number;
  population: number;
  maxPopulation: number;
};

export default defineComponent({
  components: {
    AppProgressBar,
  },
  setup(props: AppControlsProps) {
    return {
      props,
      resourceColor: colors.knownResource.hex,
      populationColor: colors.players.self.hex,
      emptyResourceColor: getColor(colors.knownResource.rgb, 0.2),
      emptyPopulationColor: getColor(colors.players.self.rgb, 0.2),
    };
  },
});
</script>
<style lang="scss" scoped>
.app-controls {
  height: 80px;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;

  .app-control {
    flex: 1;
    text-align: center;
    padding: 20px;
  }
}
</style>
