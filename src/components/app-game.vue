<template>
  <div
    class="app-game"
    :style="{
      height: `${map.height}px`,
      width: `${map.width}px`,
    }"
  >
    <app-game-canvas
      ref="appGameCanvasComponent"
      :height="map.height"
      :width="map.width"
      :hoveredElement="hoveredElement"
      :activeElement="activeElement"
      :resources="map.resources"
      :playerHive="playerHive"
      :otherHives="otherHives"
    />
    <app-interactions-canvas
      ref="appInteractionsCanvasComponent"
      :height="map.height"
      :width="map.width"
      :hoveredElement="hoveredElement"
      :activeElement="activeElement"
      @hoveredElementChanged="handleHoveredElementChanged"
      @activeElementChanged="handleActiveElementChanged"
    />
    <app-socket
      ref="appSocketComponent"
      :serverUrl="props.serverUrl"
      @self-create="handleSelfCreate"
      @game-create="handleGameCreate"
      @game-stop="handleGameStop"
      @game-tick="handleGameTick"
      @knownResource-created="handleKnownResourceCreated"
      @building-created="handleBuildingCreated"
      @hive-upgraded="handleHiveUpgraded"
    />
    <app-main-menu
      :hive="playerHive"
      :activeElement="activeElement"
      @drone-create="handleDroneCreate"
      @warrior-create="handleWarriorCreate"
      @drone-recycle="handleDroneRecycle"
      @drone-engage="handleDroneEngage"
      @drone-disengage="handleDroneDisengage"
      @warrior-engage="handleWarriorEngage"
      @warrior-disengage="handleWarriorDisengage"
      @building-create="handleBuildingCreate"
      @hive-upgrade="handleHiveUpgrade"
    />
  </div>
</template>

<script lang="ts">
import AppGameCanvas from './canvas/app-game-canvas.vue';
import AppInteractionsCanvas from './canvas/app-interactions-canvas.vue';
import AppSocket from './app-socket.vue';
import AppMainMenu from './user-interface/app-main-menu.vue';
import { defineComponent, ref, reactive, nextTick } from 'vue';
import { Player, Game, Resource, Map, Hive, DroneAction, HoverableElement } from 'src/types';
import Factories from 'src/factories';

export default defineComponent({
  props: {
    serverUrl: String,
  },
  components: {
    AppGameCanvas,
    AppInteractionsCanvas,
    AppSocket,
    AppMainMenu,
  },
  setup(props) {
    const appSocketComponent = ref();
    const appGameCanvasComponent = ref();
    const appInteractionsCanvasComponent = ref();
    const hoveredElement = ref<HoverableElement>();
    const activeElement = ref<HoverableElement>();
    const map = reactive<Map>(Factories.createMap());
    const playerHive = ref<Hive>(Factories.createHive());
    const knownResources = ref<Resource[]>([]);
    const otherHives = reactive<Hive[]>([]);
    const isLocked = ref<boolean>();
    isLocked.value = false;

    let playerId: string;
    const handleSelfCreate = (player: Player): void => {
      playerId = player.id;
      appInteractionsCanvasComponent.value.addHive(player.hive);
    };

    const handleGameCreate = (game: Game): void => {
      map.height = game.map.height;
      map.width = game.map.width;
      map.resources = game.map.resources;
    };

    const handleGameStop = (): void => {
      console.info('Game stopped');
    };

    const handleGameTick = (game: Game): void => {
      if (!isLocked.value) {
        isLocked.value = true;
        otherHives.length = 0;
        map.resources = game.map.resources;

        for (let i = 0; i < game.players.length; i++) {
          const player = game.players[i];
          if (player.id === playerId) {
            playerHive.value = player.hive;
          } else {
            otherHives.push(player.hive);
          }
        }

        if (appGameCanvasComponent.value) {
          nextTick().then(() => appGameCanvasComponent.value.redraw());
        }

        isLocked.value = false;
      }
    };

    const handleDroneCreate = (): void => {
      appSocketComponent.value.emitMessage('drone.create');
    };

    const handleWarriorCreate = (): void => {
      appSocketComponent.value.emitMessage('warrior.create');
    };

    const handleDroneRecycle = (): void => {
      appSocketComponent.value.emitMessage('drone.recycle');
    };

    const handleDroneEngage = (action: DroneAction): void => {
      appSocketComponent.value.emitMessage('drone.engage', action);
    };

    const handleDroneDisengage = (action: DroneAction): void => {
      appSocketComponent.value.emitMessage('drone.disengage', action);
    };

    const handleWarriorEngage = (action: DroneAction): void => {
      appSocketComponent.value.emitMessage('warrior.engage', action);
    };

    const handleWarriorDisengage = (action: DroneAction): void => {
      appSocketComponent.value.emitMessage('warrior.disengage', action);
    };

    const handleHoveredElementChanged = (element: HoverableElement): void => {
      hoveredElement.value = element;
    };

    const handleActiveElementChanged = (element: HoverableElement): void => {
      activeElement.value = element;
    };

    const handleKnownResourceCreated = (resource: Resource): void => {
      appInteractionsCanvasComponent.value.addKnownResource(resource);
    };

    const handleBuildingCreate = (knownResourceId: string): void => {
      appSocketComponent.value.emitMessage('building.create', knownResourceId);
      activeElement.value = undefined;
    };

    const handleBuildingCreated = (knownResourceId: string): void => {
      appInteractionsCanvasComponent.value.removeKnownResource(knownResourceId);
    };

    const handleHiveUpgrade = (): void => {
      appSocketComponent.value.emitMessage('hive.upgrade');
    };

    const handleHiveUpgraded = (hive: Hive): void => {
      appInteractionsCanvasComponent.value.addHive(hive);
    };

    return {
      props,
      appSocketComponent,
      appInteractionsCanvasComponent,
      hoveredElement,
      handleHoveredElementChanged,
      activeElement,
      handleActiveElementChanged,
      appGameCanvasComponent,
      map,
      handleSelfCreate,
      handleGameCreate,
      handleGameStop,
      handleGameTick,
      knownResources,
      playerHive,
      otherHives,
      // Warrior create
      handleWarriorCreate,
      // Drone create
      handleDroneCreate,
      // Drone recycle
      handleDroneRecycle,
      // Drone engagement / disengagement
      handleDroneEngage,
      handleDroneDisengage,
      handleWarriorEngage,
      handleWarriorDisengage,
      // Build
      handleBuildingCreate,
      handleBuildingCreated,
      handleKnownResourceCreated,
      // Hive
      handleHiveUpgrade,
      handleHiveUpgraded,
    };
  },
});
</script>
<style lang="scss">
.app-game {
  padding: 80px 80px 80px 330px;
  background-color: #5c5c5d;
  width: auto;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

.app-canvas {
  position: absolute;
}
</style>
