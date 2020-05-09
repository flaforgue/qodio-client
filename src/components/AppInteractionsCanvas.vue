<template>
  <div class="app-canvas app-interactions-canvas">
    <canvas ref="canvas" :height="props.height" :width="props.width"></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { Hive, HoverableElement, Resource } from '../types';
import { removeFromArrayById } from '../utils';

const shouldDrawHitboxes = false;
const hitboxColor = 'rgba(255, 0, 0, 0.3)';

type AppInteractionsCanvasProps = {
  height: number;
  width: number;
  hoveredElement: HoverableElement;
  activeElement: HoverableElement;
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

  const addHive = (hive: Hive): void => {
    removeFromArrayById(hoverableElements, hive.id);

    const hitbox = new Path2D();
    hitbox.arc(hive.position.x, hive.position.y, hive.radius, 0, 2 * Math.PI);
    const hoverableElement = {
      path: hitbox,
      id: hive.id,
      type: 'hive' as 'hive',
      data: hive,
    };

    hoverableElements.push(hoverableElement);

    if (props.activeElement?.id === hoverableElement.id) {
      emit('activeElementChanged', hoverableElement);
    }

    if (shouldDrawHitboxes) {
      context.fillStyle = hitboxColor;
      context.fill(hitbox);
    }
  };

  const addKnownResource = (resource: Resource): void => {
    removeFromArrayById(hoverableElements, resource.id);

    const hitbox = new Path2D();
    hitbox.arc(resource.position.x, resource.position.y, 20, 0, 2 * Math.PI);
    hoverableElements.push({
      path: hitbox,
      id: resource.id,
      type: 'knownResource',
      data: resource,
    });

    if (shouldDrawHitboxes) {
      context.fillStyle = hitboxColor;
      context.fill(hitbox);
    }
  };

  const refresh = (): void => {
    context.clearRect(0, 0, props.width, props.height);
    for (let i = 0; i < hoverableElements.length; i++) {
      const element = hoverableElements[i];
      if (element.type === 'hive') {
        addHive(element.data as Hive);
      } else if (element.type === 'knownResource') {
        addKnownResource(element.data as Resource);
      }
    }
  };

  const removeKnownResource = (knownResourceId: string): void => {
    removeFromArrayById(hoverableElements, knownResourceId);
    if (shouldDrawHitboxes) {
      refresh();
    }
  };

  return {
    props,
    canvas,
    addHive,
    addKnownResource,
    removeKnownResource,
  };
});
</script>
