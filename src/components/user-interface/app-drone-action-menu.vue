<template>
  <div class="app-drone-action-menu">
    <div class="drone-action-menu-container">
      <app-icon-button
        v-if="props.action !== 'wait'"
        icon="minus"
        :color="colors.white.hex"
        :backgroundColor="colors.actions[props.action].hex"
        @app-click="emit('drone-disengage')"
      />

      <app-progress-bar
        :color="colors.actions[props.action].hex"
        :emptyColor="colors.lightGrey.hex"
        :value="props.nbDrones"
        :max="props.nbMaxDrones"
        :title="props.action"
      />

      <app-icon-button
        v-if="props.action !== 'wait'"
        icon="plus"
        :color="colors.white.hex"
        :backgroundColor="colors.actions[props.action].hex"
        @app-click="emit('drone-engage')"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { colors } from 'src/enums';
import AppProgressBar from './shared/app-progress-bar.vue';
import AppIconButton from './shared/app-icon-button.vue';
import { DroneAction } from 'src/types';

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
    return {
      emit,
      props,
      colors,
    };
  },
});
</script>

<style lang="scss" scoped>
.app-drone-action-menu {
  width: 100%;
}

.drone-action-menu-container {
  display: flex;
  justify-content: center;

  .app-progress-bar {
    width: 220px;
    margin-left: 10px;
    margin-right: 10px;
  }
}
</style>
