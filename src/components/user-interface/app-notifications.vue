<template>
  <div class="app-notifications">
    <div
      v-for="(notification, index) in props.notifications"
      :key="index"
      :style="{
        top: `${index * 70 + 10}px`,
      }"
      :class="{ main: index === 0 }"
      class="app-socket-notification"
      @click="emit('remove-notification', index)"
    >
      {{ getNotificationMessage(notification) }}
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

type AppNotificationsProps = {
  notificationTexts: string[];
};

export default defineComponent({
  setup(props: AppNotificationsProps, { emit }) {
    const getNotificationMessage = (eventName: string): string => {
      switch (eventName) {
        case 'drone.created':
          return 'Drone created';
        case 'warrior.created':
          return 'Warrior created';
        case 'drone.recycled':
          return 'Drone recycled';
        case 'hive.upgraded':
          return 'Hive upgraded';
        case 'knownResource.created':
          return 'New resource discovered';
        case 'building.built':
          return 'Building complete';
        default:
          return 'No message to display';
      }
    };

    return {
      emit,
      props,
      getNotificationMessage,
    };
  },
});
</script>
<style lang="scss" scoped>
.app-socket-notification {
  position: fixed;
  opacity: 0.7;
  right: 10px;
  background-color: #fff;
  width: 260px;
  padding: 15px 20px;
  border-radius: 4px;
  border-bottom: 10px solid #456990;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.36), 0 0 6px 0 rgba(0, 0, 0, 0.12);
  transition: all 0.3s;
  cursor: pointer;

  &:hover,
  &.main {
    opacity: 1;
  }
}
</style>
