<template>
  <div id="app">
    <AppGame :serverUrl="serverUrl" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AppGame from './components/AppGame.vue';

export default defineComponent({
  name: 'App',
  components: {
    AppGame,
  },
  setup() {
    const serverUrl = 'ws://localhost:3000';

    return {
      serverUrl,
    };
  },
});
</script>

<style lang="scss">
body {
  margin: 0;
}
</style>
