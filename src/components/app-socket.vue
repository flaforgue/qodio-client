<template>
  <div class="app-socket">
    <app-notifications
      :notifications="notifications"
      @remove-notification="removeNotificationMessage"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import SocketIO from 'socket.io-client';
import { DroneAction } from 'src/types';
import AppNotifications from './user-interface/app-notifications.vue';

type AppSocketProps = {
  serverUrl: string;
  dronesToEngage: Record<DroneAction, boolean>;
  dronesToDisengage: Record<DroneAction, boolean>;
};

const maxNotifications = 3;

export default defineComponent({
  components: { AppNotifications },
  setup(props: AppSocketProps, { emit }) {
    const socket = SocketIO(props.serverUrl);
    const notifications = reactive<string[]>([]);

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
      'drone.created',
      'warrior.created',
      'drone.recycled',
      'building.built',
    ];

    const eventWithNotification = [
      'drone.created',
      'warrior.created',
      'drone.recycled',
      'hive.upgraded',
      'knownResource.created',
      'building.built',
    ];

    for (let i = 0; i < eventProxied.length; i++) {
      socket.on(eventProxied[i], (data) => {
        if (eventWithNotification.indexOf(eventProxied[i]) !== -1) {
          if (notifications.length >= maxNotifications) {
            notifications.pop();
          }

          notifications.unshift(eventProxied[i]);
        }

        emit(eventProxied[i].replace('.', '-'), data);
      });
    }

    socket.on('ping', () => {
      console.debug('ping');
    });

    socket.on('pong', () => {
      console.debug('pong');
    });

    const removeNotificationMessage = (index: number): void => {
      notifications.splice(index, 1);
    };

    return {
      removeNotificationMessage,
      notifications,
      emitMessage,
    };
  },
});
</script>
