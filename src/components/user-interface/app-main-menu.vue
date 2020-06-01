<template>
  <div class="main-menu">
    <div class="main-menu-lines">
      <div class="main-menu-line">
        <app-progress-bar
          class="main-menu-item"
          :color="colors.players.self.hex"
          :emptyColor="emptyPopulationColor"
          :value="props.hive.drones.length"
          :max="props.hive.maxPopulation"
          title="Drones"
        />
        <app-progress-bar
          class="main-menu-item"
          :color="colors.actions.collect.hex"
          :emptyColor="emptyResourceColor"
          :value="props.hive.stock"
          :max="props.hive.maxStock"
          title="Resources"
        />
      </div>
      <hr class="app-divider" />
      <div class="main-menu-line" v-for="action in workerActions" :key="action">
        <app-drone-action-menu
          :action="action"
          :nbDrones="props.hive.actionsNbDrones[action]"
          :nbMaxDrones="props.hive.drones.length"
          @drone-engage="emit('drone-engage', action)"
          @drone-disengage="emit('drone-disengage', action)"
        />
      </div>
    </div>
    <div class="app-active-element-menu">
      <div v-if="props.activeElement" class="main-menu-line">
        <app-known-resource-menu
          v-if="props.activeElement.type === 'knownResource'"
          :data="props.activeElement.data"
          :currentStock="props.hive.stock"
          @building-create="emit('building-create', props.activeElement.data.id)"
        />

        <app-hive-menu
          v-else-if="props.activeElement.type === 'hive'"
          :hive="props.hive"
          @hive-upgrade="emit('hive-upgrade')"
          @drone-create="emit('drone-create')"
          @warrior-create="emit('warrior-create')"
          @drone-recycle="emit('drone-recycle')"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { colors, workerActions } from 'src/enums';
import AppProgressBar from './shared/app-progress-bar.vue';
import AppDroneActionMenu from './app-drone-action-menu.vue';
import AppIconButton from './shared/app-icon-button.vue';
import AppKnownResourceMenu from './contextual-menus/app-known-resource-menu.vue';
import AppHiveMenu from './contextual-menus/app-hive-menu.vue';
import { getColor } from 'src/utils';
import { Hive, HoverableElement } from 'src/types';

type AppMainMenuProps = {
  hive: Hive;
  activeElement?: HoverableElement;
};

export default defineComponent({
  components: {
    AppDroneActionMenu,
    AppProgressBar,
    AppIconButton,
    AppKnownResourceMenu,
    AppHiveMenu,
  },

  setup(props: AppMainMenuProps, { emit }) {
    return {
      emit,
      props,
      colors,
      workerActions: workerActions.filter((action) => action !== 'recycle'),
      emptyResourceColor: getColor(colors.actions.collect.rgb, 0.2),
      emptyPopulationColor: getColor(colors.players.self.rgb, 0.2),
    };
  },
});
</script>

<style lang="scss" scoped>
.main-menu {
  height: 100%;
  width: 330px;
  position: fixed;
  overflow: scroll;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;

  .main-menu-lines {
    padding-top: 10px;
    padding-bottom: 20px;

    .main-menu-line {
      display: flex;

      & + .main-menu-line {
        margin-top: 10px;
      }

      &:not(.full-width) {
        width: calc(100% - 30px);
        margin-left: auto;
        margin-right: auto;
      }
    }

    .main-menu-item {
      margin-top: 20px;
      flex: 1;

      & + .main-menu-item {
        margin-left: 10px;
      }
    }
  }

  .app-active-element-menu {
    flex: 1;
    padding: 15px;
    background-color: #5c5c5d;

    h3 {
      color: #fff;
    }
  }

  .app-divider {
    border: none;
    border-top: 1px solid #ccc;
    margin: 20px 0;
  }
}
</style>
