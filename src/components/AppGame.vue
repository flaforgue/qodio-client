<template>
  <div
    class="app-game"
    :style="{
      height: `${board.height}px`,
      width: `${board.width}px`,
    }"
  >
    <AppGameCanvas
      ref="appGameCanvasComponent"
      :height="board.height"
      :width="board.width"
      :hoveredElement="hoveredElement"
      :activeElement="activeElement"
      :resources="board.resources"
      :playerHive="playerHive"
      :otherHives="otherHives"
    />
    <AppInteractionsCanvas
      ref="appInteractionsCanvasComponent"
      :height="board.height"
      :width="board.width"
      :playerHive="playerHive"
      :hoveredElement="hoveredElement"
      :activeElement="activeElement"
      @hoveredElementChanged="handleHoveredElementChanged"
      @activeElementChanged="handleActiveElementChanged"
    />
    <AppSocket
      ref="appSocketComponent"
      :serverUrl="props.serverUrl"
      :nbDronesToCreate="nbDronesToCreate"
      :nbDronesToRecycle="nbDronesToRecycle"
      :dronesToEngage="dronesToEngage"
      :dronesToDisengage="dronesToDisengage"
      @self-create="handleSelfCreate"
      @game-create="handleGameCreate"
      @game-stop="handleGameStop"
      @game-tick="handleGameTick"
      @drone-created="handleDroneCreated"
      @drone-recycled="handleDroneRecycled"
      @drone-engaged="handleDroneEngaged"
      @drone-disengaged="handleDroneDisengaged"
    />
    <AppControls
      :hive="playerHive"
      :activeElement="activeElement"
      @drone-create="handleDroneCreate"
      @drone-recycle="handleDroneRecycle"
      @drone-engage="handleDroneEngage"
      @drone-disengage="handleDroneDisengage"
      @known-resource-build="handleKnownResourceBuild"
    />
  </div>
</template>

<script lang="ts">
import AppGameCanvas from './AppGameCanvas.vue';
import AppInteractionsCanvas from './AppInteractionsCanvas.vue';
import AppSocket from './AppSocket.vue';
import AppControls from './AppControls.vue';
import { defineComponent, ref, reactive, nextTick } from 'vue';
import { Player, Game, Resource, Board, Hive, DroneAction, HoverableElement } from '../types';
import { Factories } from '../utils';

export default defineComponent({
  props: {
    serverUrl: String,
  },
  components: {
    AppGameCanvas,
    AppInteractionsCanvas,
    AppSocket,
    AppControls,
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
    const nbDronesToCreate = ref<number>(0);
    const nbDronesToRecycle = ref<number>(0);
    let nbResourcesDiscovered = 0;
    let nbBuildingRequests = 0;

    const dronesToEngage: Record<DroneAction, boolean> = reactive({
      wait: false,
      scout: false,
      collect: false,
      build: false,
    });
    const dronesToDisengage: Record<DroneAction, boolean> = reactive({
      wait: false,
      scout: false,
      collect: false,
      build: false,
    });
    const isLocked = ref<boolean>();
    isLocked.value = false;

    let playerId: string;
    const handleSelfCreate = (player: Player): void => {
      playerId = player.id;
      appInteractionsCanvasComponent.value.drawHive(player.hive);
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

        if (appInteractionsCanvasComponent.value) {
          if (playerHive.value.nbResourcesDiscovered > nbResourcesDiscovered) {
            appInteractionsCanvasComponent.value.drawKnownResources(
              playerHive.value.knownResources,
            );
            nbResourcesDiscovered = playerHive.value.nbResourcesDiscovered;
          }

          if (nbBuildingRequests < playerHive.value.buildingRequests.length) {
            nextTick().then(() => appInteractionsCanvasComponent.value.redraw());
            nbBuildingRequests = playerHive.value.buildingRequests.length;
          }
        }

        if (appGameCanvasComponent.value) {
          nextTick().then(() => appGameCanvasComponent.value.redraw());
        }

        isLocked.value = false;
      }
    };

    const handleDroneCreate = (): void => {
      if (nbDronesToCreate.value < 15) {
        nbDronesToCreate.value++;
      }
    };

    const handleDroneCreated = (): void => {
      if (nbDronesToCreate.value > 0) {
        nbDronesToCreate.value--;
      }
    };

    const handleDroneRecycle = (): void => {
      nbDronesToRecycle.value++;
    };

    const handleDroneRecycled = (): void => {
      if (nbDronesToCreate.value > 0) {
        nbDronesToRecycle.value--;
      }
    };

    const handleDroneEngage = (action: DroneAction): void => {
      dronesToEngage[action] = true;
    };

    const handleDroneDisengage = (action: DroneAction): void => {
      dronesToDisengage[action] = true;
    };

    const handleDroneEngaged = (action: DroneAction): void => {
      dronesToEngage[action] = false;
    };

    const handleDroneDisengaged = (action: DroneAction): void => {
      dronesToDisengage[action] = false;
    };

    const handleHoveredElementChanged = (element: HoverableElement): void => {
      hoveredElement.value = element;
    };

    const handleActiveElementChanged = (element: HoverableElement): void => {
      activeElement.value = element;
    };

    const handleKnownResourceBuild = (knownResourceId: string): void => {
      appSocketComponent.value.emitMessage('building.create', knownResourceId);
      activeElement.value = undefined;
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
      // drone create
      handleDroneCreate,
      nbDronesToCreate,
      handleDroneCreated,
      // drone recycle
      handleDroneRecycle,
      nbDronesToRecycle,
      handleDroneRecycled,
      // drone engagement / disengagement
      dronesToEngage,
      dronesToDisengage,
      handleDroneEngage,
      handleDroneDisengage,
      handleDroneEngaged,
      handleDroneDisengaged,
      // Build
      handleKnownResourceBuild,
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
