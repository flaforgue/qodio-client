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
      @self-create="handleSelfCreate"
      @game-create="handleGameCreate"
      @game-stop="handleGameStop"
      @game-tick="handleGameTick"
    />
    <AppControls
      :stock="playerHive.stock"
      :maxStock="playerHive.maxStock"
      :population="playerHive.drones.length"
      :maxPopulation="playerHive.maxPopulation"
    />
  </div>
</template>

<script lang="ts">
import AppCanvas from './AppCanvas.vue';
import AppSocket from './AppSocket.vue';
import AppControls from './AppControls.vue';
import { defineComponent, ref, reactive, nextTick } from 'vue';
import { Player, Game, Resource, Board, Hive } from '../types';
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
    const isLocked = ref<boolean>();
    isLocked.value = false;
    let playerId: string;

    const board = reactive<Board>(Factories.createBoard());
    const playerHive = ref<Hive>(Factories.createHive());
    const knownResources = ref<Resource[]>([]);
    const otherHives = reactive<Hive[]>([]);

    const handleSelfCreate = (player: Player): void => {
      playerId = player.id;
    };

    const handleGameCreate = (game: Game): void => {
      board.height = game.board.height;
      board.width = game.board.width;
      board.resources = game.board.resources;
    };

    const handleGameStop = (): void => {
      console.log('Game stopped');
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
    };
  },
});
</script>
<style lang="scss">
.app-game {
  padding: 80px;
  background-color: #333;
  max-width: auto;
  width: auto;
}
</style>
