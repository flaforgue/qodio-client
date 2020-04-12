<template>
  <div></div>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from 'vue';
import SocketIO from 'socket.io-client';
import { Game, Player } from 'src/types';

type AppSocketProps = {
  serverUrl: string;
};

export default defineComponent((props: AppSocketProps, context: SetupContext) => {
  const socket = SocketIO(props.serverUrl);

  socket.on('self.create', (player: Player) => {
    context.emit('self-create', player);
  });

  socket.on('game.create', (game: Game) => {
    context.emit('game-create', game);
  });

  socket.on('game.stop', () => {
    context.emit('game-stop');
  });

  socket.on('game.tick', (game: Game) => {
    context.emit('game-tick', game);
  });

  socket.on('ping', () => {
    console.log('ping');
  });

  socket.on('pong', () => {
    console.log('pong');
  });
});
</script>
