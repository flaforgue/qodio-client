<template>
  <div></div>
</template>

<script lang="ts">
import { defineComponent, SetupContext, watch } from 'vue';
import SocketIO from 'socket.io-client';

type AppSocketProps = {
  serverUrl: string;
  nbDronesToCreate: number;
};

export default defineComponent((props: AppSocketProps, context: SetupContext) => {
  const socket = SocketIO(props.serverUrl);

  const eventProxied = ['self.create', 'game.create', 'game.stop', 'game.tick', 'drone.created'];

  for (let i = 0; i < eventProxied.length; i++) {
    socket.on(eventProxied[i], (data) => {
      context.emit(eventProxied[i].replace('.', '-'), data);
    });
  }

  watch(
    () => props.nbDronesToCreate,
    (newValue, prevValue) => {
      if (newValue > prevValue) {
        socket.emit('drone.create');
      }
    },
  );

  socket.on('ping', () => {
    console.debug('ping');
  });

  socket.on('pong', () => {
    console.debug('pong');
  });
});
</script>
