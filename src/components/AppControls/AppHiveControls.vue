<template>
  <div class="app-hive-controls">
    <h3>Hive</h3>
    <p>Level: {{ props.data.level }}</p>
    <p>Resource units: {{ props.data.stock }} / {{ props.data.maxStock }}</p>
    <p>Drones: {{ props.data.drones.length }} / {{ props.data.maxPopulation }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Resource } from 'src/types';

type AppHiveControlsProps = {
  data: Resource;
};

export default defineComponent({
  setup(props: AppHiveControlsProps) {
    return {
      props,
    };
  },
});
</script>

<style lang="scss" scoped></style>
