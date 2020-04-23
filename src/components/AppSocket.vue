<template>
  <div></div>
</template>

<script lang="ts">
import { defineComponent, watch, watchEffect, ref } from 'vue';
import SocketIO from 'socket.io-client';
import { DroneAction } from '../types';
import { droneActions } from '../enums';

type AppSocketProps = {
  serverUrl: string;
  nbDronesToCreate: number;
  nbDronesToRecycle: number;
  dronesToEngage: Record<DroneAction, boolean>;
  dronesToDisengage: Record<DroneAction, boolean>;
};

export default defineComponent((props: AppSocketProps, { emit }) => {
  const socket = SocketIO(props.serverUrl);

  const eventProxied = [
    'self.create',
    'game.create',
    'game.stop',
    'game.tick',
    'drone.created',
    'drone.recycled',
  ];

  for (let i = 0; i < eventProxied.length; i++) {
    socket.on(eventProxied[i], (data) => {
      emit(eventProxied[i].replace('.', '-'), data);
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

  watch(
    () => props.nbDronesToRecycle,
    (newValue, prevValue) => {
      if (newValue > prevValue) {
        socket.emit('drone.recycle');
      }
    },
  );

  for (let i = 0; i < droneActions.length; i++) {
    watch(
      () => props.dronesToEngage[droneActions[i]],
      (newValue, prevValue) => {
        console.log(props.dronesToEngage);
        console.log(newValue, prevValue);
        if (newValue) {
          socket.emit('drone.engage', droneActions[i]);
          emit('drone-engaged', droneActions[i]);
        }
      },
    );

    watch(
      () => props.dronesToDisengage[droneActions[i]],
      (value) => {
        if (value) {
          socket.emit('drone.disengage', droneActions[i]);
          emit('drone-disengaged', droneActions[i]);
        }
      },
    );
  }

  socket.on('ping', () => {
    console.debug('ping');
  });

  socket.on('pong', () => {
    console.debug('pong');
  });
});
</script>
