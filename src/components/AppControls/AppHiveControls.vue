<template>
  <div class="app-hive-controls">
    <h3>Hive - level {{ props.hive.level }}</h3>
    <app-icon-button
      class="app-control"
      icon="build"
      :label="
        `Upgrade (${config.hiveUpgradeResourceCost}) ${
          props.hive.action === 'upgradeHive' ? `: ${Math.floor(props.hive.actionProgress)}%` : ''
        }`
      "
      :backgroundColor="colors.hive.actions.upgradeHive.hex"
      :color="colors.white.hex"
      :disabled="
        props.hive.action !== 'wait' ||
          props.hive.stock < config.hiveUpgradeResourceCost ||
          props.hive.level !== 1
      "
      @app-click="emit('hive-upgrade')"
    />

    <app-icon-button
      class="app-control"
      icon="plus"
      :label="
        `Create Drone (${config.droneCreateResourceCost}) ${
          props.hive.action === 'createDrone' ? `: ${Math.floor(props.hive.actionProgress)}%` : ''
        }`
      "
      :backgroundColor="colors.hive.actions.createDrone.hex"
      :color="colors.white.hex"
      :disabled="
        props.hive.action !== 'wait' ||
          props.hive.stock < config.droneCreateResourceCost ||
          props.hive.drones.length >= props.hive.maxPopulation
      "
      @app-click="emit('drone-create')"
    />

    <app-icon-button
      class="app-control"
      icon="minus"
      :label="
        `Recycle Drone ${
          props.hive.action === 'recycleDrone' ? `: ${Math.floor(props.hive.actionProgress)}%` : ''
        }`
      "
      :backgroundColor="colors.hive.actions.recycleDrone.hex"
      :color="colors.black.hex"
      :disabled="props.hive.action !== 'wait' || props.hive.drones.length <= 0"
      @app-click="emit('drone-recycle')"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Hive } from 'src/types';
import config from '../../config';
import colors from '../../enums/colors';
import AppIconButton from './AppIconButton.vue';

type AppHiveControlsProps = {
  hive: Hive;
};

export default defineComponent({
  components: { AppIconButton },
  setup(props: AppHiveControlsProps, { emit }) {
    return {
      props,
      config,
      colors,
      emit,
    };
  },
});
</script>

<style lang="scss" scoped>
.app-control {
  margin-top: 10px;
}
</style>
