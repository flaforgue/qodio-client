<template>
  <div
    class="app-game"
    :style="{
      height: `${board.height}px`,
      width: `${board.width}px`,
    }"
  >
    <app-game-canvas
      ref="appGameCanvasComponent"
      :height="board.height"
      :width="board.width"
      :hoveredElement="hoveredElement"
      :activeElement="activeElement"
      :resources="board.resources"
      :playerHive="playerHive"
      :otherHives="otherHives"
    />
    <app-interactions-canvas
      ref="appInteractionsCanvasComponent"
      :height="board.height"
      :width="board.width"
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
      @drone-recycle="handleDroneRecycle"
      @drone-engage="handleDroneEngage"
      @drone-disengage="handleDroneDisengage"
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
import { Player, Game, Resource, Board, Hive, DroneAction, HoverableElement } from 'src/types';
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
    const board = reactive<Board>(Factories.createBoard());
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
      board.height = game.board.height;
      board.width = game.board.width;
      board.resources = game.board.resources;
    };

    const handleGameStop = (): void => {
      console.info('Game stopped');
    };

    const handleGameTick = (game: Game): void => {
      if (!isLocked.value) {
        isLocked.value = true;
        otherHives.length = 0;
        board.resources = game.board.resources;

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

    const handleDroneRecycle = (): void => {
      appSocketComponent.value.emitMessage('drone.recycle');
    };

    const handleDroneEngage = (action: DroneAction): void => {
      appSocketComponent.value.emitMessage('drone.engage', action);
    };

    const handleDroneDisengage = (action: DroneAction): void => {
      appSocketComponent.value.emitMessage('drone.disengage', action);
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
      board,
      handleSelfCreate,
      handleGameCreate,
      handleGameStop,
      handleGameTick,
      knownResources,
      playerHive,
      otherHives,
      // Drone create
      handleDroneCreate,
      // Drone recycle
      handleDroneRecycle,
      // Drone engagement / disengagement
      handleDroneEngage,
      handleDroneDisengage,
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
  background-color: #333;
  width: auto;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

.app-canvas {
  position: absolute;
}
</style>
