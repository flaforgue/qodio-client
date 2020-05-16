<template>
  <div></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SocketIO from 'socket.io-client';
import { DroneAction } from 'src/types';

type AppSocketProps = {
  serverUrl: string;
  dronesToEngage: Record<DroneAction, boolean>;
  dronesToDisengage: Record<DroneAction, boolean>;
};

export default defineComponent((props: AppSocketProps, { emit }) => {
  const socket = SocketIO(props.serverUrl);

  const emitMessage = (name: string, data?: unknown): void => {
    socket.emit(name, data);
  };

  const eventProxied = [
    'self.create',
    'game.create',
    'game.stop',
    'game.tick',
    'building.created',
    'knownResource.created',
    'hive.upgraded',
  ];

  for (let i = 0; i < eventProxied.length; i++) {
    socket.on(eventProxied[i], (data) => {
      emit(eventProxied[i].replace('.', '-'), data);
    });
  }

  socket.on('ping', () => {
    console.debug('ping');
  });

  socket.on('pong', () => {
    console.debug('pong');
  });

  return {
    emitMessage,
  };
});
</script>
