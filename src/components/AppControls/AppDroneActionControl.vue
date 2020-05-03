<template>
  <div class="app-drone-action-control">
    <app-icon-button
      v-if="props.action !== 'wait'"
      icon="minus"
      :color="colors.white.hex"
      :backgroundColor="colors.actions.wait.hex"
      @click="handleDroneDisengage"
    />

    <app-progress-bar
      :color="colors.actions[props.action].hex"
      :emptyColor="colors.lightGrey.hex"
      :value="props.nbDrones"
      :max="props.nbMaxDrones"
    />

    <app-icon-button
      v-if="props.action !== 'wait'"
      icon="plus"
      :color="colors.white.hex"
      :backgroundColor="colors.actions[props.action].hex"
      @click="handleDroneEngage"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { colors } from '../../enums';
import AppProgressBar from './AppProgressBar.vue';
import AppIconButton from './AppIconButton.vue';
import { DroneAction } from '../../types';

type AppDroneActionControlProps = {
  action: DroneAction;
  nbDrones: number;
  nbMaxDrones: number;
};

export default defineComponent({
  components: {
    AppProgressBar,
    AppIconButton,
  },

  setup(props: AppDroneActionControlProps, { emit }) {
    const handleDroneEngage = (): void => {
      emit('drone-engage', props.action);
    };

    const handleDroneDisengage = (): void => {
      emit('drone-disengage', props.action);
    };

    return {
      props,
      handleDroneEngage,
      handleDroneDisengage,
      colors,
    };
  },
});
</script>

<style lang="scss" scoped>
.app-drone-action-control {
  width: 100%;
  display: flex;
  justify-content: center;

  .app-progress-bar {
    width: 220px;
    margin-left: 10px;
    margin-right: 10px;
  }
}
</style>
