<template>
  <div class="app-hive-controls">
    <h3>Hive</h3>
    <p>Level: {{ props.data.level }}</p>
    <p>Resource units: {{ props.data.stock }} / {{ props.data.maxStock }}</p>
    <p>Drones: {{ props.data.drones.length }} / {{ props.data.maxPopulation }}</p>
    <app-icon-button
      :backgroundColor="colors.players.self.hex"
      :color="colors.white.hex"
      :disabled="props.currentStock < upgradeResourceCost"
      icon="build"
      label="Upgrade"
      @app-click="handleHiveUpgrade"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Resource } from 'src/types';
import config from '../../config';

type AppHiveControlsProps = {
  data: Resource;
};

export default defineComponent((props: AppHiveControlsProps, { emit }) => {
  const handleHiveUpgrade = (): void => {
    emit('hive-upgrade');
  };

  return {
    props,
    handleHiveUpgrade,
    upgradeResourceCost: config.upgradeResourceCost,
  };
});
</script>

<style lang="scss" scoped></style>
