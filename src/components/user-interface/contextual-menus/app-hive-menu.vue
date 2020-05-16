<template>
  <div class="app-hive-menu">
    <h3>Hive - level {{ props.hive.level }}</h3>
    <app-icon-button
      class="app-menu-item"
      icon="build"
      :label="
        `Upgrade ${
          props.hive.level < config.maxHiveLevel
            ? `(${config.hiveUpgradeResourceCosts[props.hive.level]})`
            : ''
        } ${
          props.hive.action === 'upgradeHive' ? `: ${Math.floor(props.hive.actionProgress)}%` : ''
        }`
      "
      :backgroundColor="colors.hive.actions.upgradeHive.hex"
      :color="colors.white.hex"
      :disabled="
        props.hive.action !== 'wait' ||
          props.hive.level >= config.maxHiveLevel ||
          props.hive.stock < config.hiveUpgradeResourceCosts[props.hive.level]
      "
      @app-click="emit('hive-upgrade')"
    />

    <app-icon-button
      class="app-menu-item"
      icon="plus"
      :label="
        `Create Drone (${config.droneCreationResourceCost}) ${
          props.hive.action === 'createDrone' ? `: ${Math.floor(props.hive.actionProgress)}%` : ''
        }`
      "
      :backgroundColor="colors.hive.actions.createDrone.hex"
      :color="colors.white.hex"
      :disabled="
        props.hive.action !== 'wait' ||
          props.hive.stock < config.droneCreationResourceCost ||
          props.hive.drones.length >= props.hive.maxPopulation
      "
      @app-click="emit('drone-create')"
    />

    <app-icon-button
      class="app-menu-item"
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
import config from 'src/config';
import colors from 'src/enums/colors';
import AppIconButton from '../shared/app-icon-button.vue';

type AppHiveMenuProps = {
  hive: Hive;
};

export default defineComponent({
  components: { AppIconButton },
  setup(props: AppHiveMenuProps, { emit }) {
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
.app-menu-item {
  margin-top: 10px;
}
</style>
