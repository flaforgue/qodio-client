<template>
  <div class="app-canvas app-interactions-canvas">
    <canvas ref="canvas" :height="props.height" :width="props.width"></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { Hive, HoverableElement, Resource } from '../types';
import { existsInArray } from '../utils';

const hitboxColors = 'rgba(255, 0, 0, 0.5)';

type AppInteractionsCanvasProps = {
  height: number;
  width: number;
  hoveredElement: HoverableElement;
  activeElement: HoverableElement;
  playerHive: Hive;
  knownResources: Resource[];
};

export default defineComponent((props: AppInteractionsCanvasProps, { emit }) => {
  const hoverableElements: HoverableElement[] = [];
  const canvas = ref<HTMLCanvasElement>();
  let context: CanvasRenderingContext2D;

  const handleMouseMove = (event): void => {
    if (props.hoveredElement) {
      if (!context.isPointInPath(props.hoveredElement.path, event.offsetX, event.offsetY)) {
        emit('hoveredElementChanged', null);
      }
    } else {
      for (let i = 0; i < hoverableElements.length; i++) {
        if (context.isPointInPath(hoverableElements[i].path, event.offsetX, event.offsetY)) {
          emit('hoveredElementChanged', hoverableElements[i]);
          return;
        }
      }
    }
  };

  const handleMouseClick = (): void => {
    if (props.hoveredElement) {
      emit('activeElementChanged', props.hoveredElement);
    } else if (props.activeElement) {
      emit('activeElementChanged', null);
    }
  };

  onMounted(() => {
    if (canvas.value) {
      context = canvas.value.getContext('2d') as CanvasRenderingContext2D;
      canvas.value.addEventListener('mousemove', handleMouseMove);
      canvas.value.addEventListener('click', handleMouseClick);
    }
  });

  const drawHive = (hive: Hive): void => {
    if (!existsInArray(hoverableElements, hive.id)) {
      const hitbox = new Path2D();
      hitbox.arc(hive.position.x, hive.position.y, hive.radius, 0, 2 * Math.PI);
      context.fillStyle = hitboxColors;
      context.fill(hitbox);
      hoverableElements.push({
        path: hitbox,
        id: hive.id,
        type: 'hive',
        data: hive,
      });
    }
  };

  const drawKnownResource = (knownResource: Resource): void => {
    if (!existsInArray(hoverableElements, knownResource.id)) {
      const hitbox = new Path2D();
      hitbox.arc(knownResource.position.x, knownResource.position.y, 20, 0, 2 * Math.PI);
      context.fillStyle = hitboxColors;
      context.fill(hitbox);
      hoverableElements.push({
        path: hitbox,
        id: knownResource.id,
        type: 'knownResource',
        data: knownResource,
      });
    }
  };

  const drawKnownResources = (knownResources: Resource[]): void => {
    for (let i = 0; i < knownResources.length; i++) {
      drawKnownResource(knownResources[i]);
    }
  };

  const redraw = (): void => {
    hoverableElements.length = 0;
    context.clearRect(0, 0, props.width, props.height);
    drawHive(props.playerHive);
    drawKnownResources(props.playerHive.knownResources);
    emit('hoveredElementChanged', null);
    emit('activeElementChanged', null);
  };

  return {
    props,
    canvas,
    drawHive,
    drawKnownResources,
    redraw,
  };
});
</script>
