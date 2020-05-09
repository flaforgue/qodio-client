<template>
  <div class="app-controls">
    <div class="app-controls-lines">
      <div class="app-controls-line">
        <app-icon-button
          icon="minus"
          class="app-control small-btn"
          :color="colors.black.hex"
          :backgroundColor="colors.grey.hex"
          @app-click="handleDroneRecycle"
        />
        <app-icon-button
          icon="plus"
          class="app-control small-btn"
          :color="colors.white.hex"
          :backgroundColor="colors.players.self.hex"
          @app-click="handleDroneCreate"
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
          :color="colors.actions.collect.hex"
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
    <div class="app-active-element-controls">
      <div v-if="props.activeElement" class="app-controls-line">
        <app-known-resource-controls
          v-if="props.activeElement.type === 'knownResource'"
          :data="props.activeElement.data"
          :currentStock="props.hive.stock"
          @building-create="handleBuildingCreate"
        />

        <app-hive-controls
          v-else-if="props.activeElement.type === 'hive'"
          :data="props.activeElement.data"
          @hive-upgrade="handleHiveUpgrade"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { colors, droneActions } from '../enums';
import AppProgressBar from './AppControls/AppProgressBar.vue';
import AppDroneActionControl from './AppControls/AppDroneActionControl.vue';
import AppIconButton from './AppControls/AppIconButton.vue';
import AppKnownResourceControls from './AppControls/AppKnownResourceControls.vue';
import AppHiveControls from './AppControls/AppHiveControls.vue';
import { getColor } from '../utils';
import { Hive, DroneAction, HoverableElement } from 'src/types';

type AppControlsProps = {
  hive: Hive;
  activeElement?: HoverableElement;
};

export default defineComponent({
  components: {
    AppDroneActionControl,
    AppProgressBar,
    AppIconButton,
    AppKnownResourceControls,
    AppHiveControls,
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

    const handleBuildingCreate = (knownResourceId: string): void => {
      emit('building-create', knownResourceId);
    };

    const handleHiveUpgrade = (): void => {
      emit('hive-upgrade');
    };

    return {
      props,
      colors,
      droneActions,
      handleDroneCreate,
      handleDroneRecycle,
      handleDroneEngage,
      handleDroneDisengage,
      handleBuildingCreate,
      handleHiveUpgrade,
      emptyResourceColor: getColor(colors.actions.collect.rgb, 0.2),
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
  overflow: scroll;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;

  .app-controls-lines {
    padding-top: 10px;
    padding-bottom: 20px;

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

      &:not(.small-btn) {
        flex: 1;
      }

      & + .app-control {
        margin-left: 10px;
      }
    }
  }

  .app-active-element-controls {
    flex: 1;
    padding: 15px;
    background-color: rgba(255, 255, 255, 0.3);

    h3 {
      color: #fff;
    }
  }
}
</style>
