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
    const resourceColor = getColor(colors.knownResource);
    const emptyResourceColor = getColor(colors.knownResource, 0.2);
    const populationColor = getColor(colors.players.self);
    const emptyPopulationColor = getColor(colors.players.self, 0.2);

    return {
      props,
      resourceColor,
      populationColor,
      emptyResourceColor,
      emptyPopulationColor,
    };
  },
});
</script>
<style lang="scss" scoped>
.app-controls {
  height: 80px;
  width: 400px;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  border-top-right-radius: 5px;

  .app-control {
    flex: 1;
    text-align: center;
    padding: 20px;
  }
}
</style>
