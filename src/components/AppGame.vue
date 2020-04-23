<template>
  <div
    class="app-game"
    :style="{
      height: `${board.height}px`,
      width: `${board.width}px`,
    }"
  >
    <AppCanvas
      ref="canvasComponent"
      :height="board.height"
      :width="board.width"
      :resources="board.resources"
      :playerHive="playerHive"
      :otherHives="otherHives"
    />
    <AppSocket
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
      @drone-create="handleDroneCreate"
      @drone-recycle="handleDroneRecycle"
      @drone-engage="handleDroneEngage"
      @drone-disengage="handleDroneDisengage"
    />
  </div>
</template>

<script lang="ts">
import AppCanvas from './AppCanvas.vue';
import AppSocket from './AppSocket.vue';
import AppControls from './AppControls.vue';
import { defineComponent, ref, reactive, nextTick } from 'vue';
import { Player, Game, Resource, Board, Hive, DroneAction } from '../types';
import { Factories } from '../utils';

export default defineComponent({
  props: {
    serverUrl: String,
  },
  components: {
    AppCanvas,
    AppSocket,
    AppControls,
  },
  setup(props) {
    const canvasComponent = ref();
    const board = reactive<Board>(Factories.createBoard());
    const playerHive = ref<Hive>(Factories.createHive());
    const knownResources = ref<Resource[]>([]);
    const otherHives = reactive<Hive[]>([]);
    const nbDronesToCreate = ref<number>(0);
    const nbDronesToRecycle = ref<number>(0);
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

        if (canvasComponent.value) {
          nextTick().then(() => canvasComponent.value.redraw());
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

    return {
      props,
      canvasComponent,
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
      //drone recycle
      handleDroneRecycle,
      nbDronesToRecycle,
      handleDroneRecycled,
      // drone engagement
      dronesToEngage,
      dronesToDisengage,
      handleDroneEngage,
      handleDroneDisengage,
      handleDroneEngaged,
      handleDroneDisengaged,
    };
  },
});
</script>
<style lang="scss">
.app-game {
  padding: 80px 80px 80px 330px;
  background-color: #333;
  max-width: auto;
  width: auto;
}
</style>
