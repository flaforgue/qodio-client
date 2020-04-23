<template>
  <div class="app-controls">
    <div class="app-controls-line">
      <app-button
        label="-"
        class="app-control app-btn"
        :color="colors.black.hex"
        :backgroundColor="colors.grey.hex"
        @click="handleDroneRecycle"
      />
      <app-button
        label="+"
        class="app-control app-btn"
        :color="colors.white.hex"
        :backgroundColor="colors.players.self.hex"
        @click="handleDroneCreate"
      />
      <app-progress-bar
        class="app-control"
        :color="colors.players.self.hex"
        :emptyColor="emptyPopulationColor"
        :value="props.hive.drones.length"
        :max="props.hive.maxPopulation"
      />
      <app-progress-bar
        class="app-control"
        :color="colors.knownResource.hex"
        :emptyColor="emptyResourceColor"
        :value="props.hive.stock"
        :max="props.hive.maxStock"
      />
    </div>
    <div class="app-controls-line" v-for="action in droneActions" :key="action">
      <app-drone-action-control
        :action="action"
        :nbDrones="props.hive.actionsNbDrones[action]"
        :nbMaxDrones="props.hive.drones.length"
        @drone-engage="handleDroneEngage"
        @drone-disengage="handleDroneDisengage"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { colors, droneActions } from '../enums';
import AppProgressBar from './AppControls/AppProgressBar.vue';
import AppDroneActionControl from './AppControls/AppDroneActionControl.vue';
import AppButton from './AppControls/AppButton.vue';
import { getColor } from '../utils';
import { Hive, DroneAction } from 'src/types';

type AppControlsProps = {
  hive: Hive;
};

export default defineComponent({
  components: {
    AppDroneActionControl,
    AppProgressBar,
    AppButton,
  },

  setup(props: AppControlsProps, { emit }) {
    const handleDroneCreate = (): void => {
      emit('drone-create');
    };

    const handleDroneRecycle = (): void => {
      emit('drone-recycle');
    };

    const handleDroneEngage = (action: DroneAction): void => {
      emit('drone-engage', action);
    };

    const handleDroneDisengage = (action: DroneAction): void => {
      emit('drone-disengage', action);
    };

    return {
      props,
      colors,
      droneActions,
      handleDroneCreate,
      handleDroneRecycle,
      handleDroneEngage,
      handleDroneDisengage,
      emptyResourceColor: getColor(colors.knownResource.rgb, 0.2),
      emptyPopulationColor: getColor(colors.players.self.rgb, 0.2),
    };
  },
});
</script>

<style lang="scss" scoped>
.app-controls {
  height: 100%;
  width: 330px;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;

  .app-controls-line {
    display: flex;

    & + .app-controls-line {
      margin-top: 10px;
    }

    &:not(.full-width) {
      width: calc(100% - 30px);
      margin-left: auto;
      margin-right: auto;
    }
  }

  .app-control {
    margin-top: 20px;
    margin-bottom: 20px;

    &:not(.app-btn) {
      flex: 1;
    }

    & + .app-control {
      margin-left: 10px;
    }
  }
}
</style>
