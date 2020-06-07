<template>
  <div class="app-progress-bar" :style="{ color: props.color }">
    <div class="progress-bar" :style="{ backgroundColor: props.emptyColor }">
      <div
        class="progress-bar-content"
        :style="{
          width: `${Math.floor((props.value / props.max) * 100)}%`,
          backgroundColor: props.color,
        }"
      ></div>
    </div>
    <div class="progress-bar-label">
      {{ props.title }}
      ({{ props.value }}/{{ props.max }})
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

type AppCircularProgressBarProps = {
  color: string;
  emptyColor: string;
  value: number;
  max: number;
  title?: string;
};

export default defineComponent({
  setup(props: AppCircularProgressBarProps) {
    return {
      props,
    };
  },
});
</script>
<style lang="scss" scoped>
.progress-bar {
  width: 100%;
  height: 10px;
  margin-bottom: 5px;
  border-radius: 5px;
  overflow: hidden;

  .progress-bar-content {
    height: 100%;
  }
}

.progress-bar-label {
  text-align: center;
}
</style>
