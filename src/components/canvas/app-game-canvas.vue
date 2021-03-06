<template>
  <div class="app-canvas app-game-canvas">
    <canvas ref="canvas" :height="props.height" :width="props.width"></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { Hive, Drone, Resource, PlayerType, BuildingRequest, HoverableElement } from 'src/types';
import { drawCircle, getColor, drawCircularProgress, drawLine } from 'src/utils';
import { colors } from 'src/enums';
import {
  createHiveSprites,
  createDroneSprites,
  createKnownResourceSprites,
  createBuildingRequestSprites,
  createCollectorSprites,
  createCarriedResourceSprite,
} from 'src/sprites';

type AppGameCanvasProps = {
  height: number;
  width: number;
  resources: Resource[];
  playerHive: Hive;
  otherHives: Hive[];
  hoveredElement?: HoverableElement;
  activeElement?: HoverableElement;
};

export default defineComponent((props: AppGameCanvasProps) => {
  const hiveSprites = createHiveSprites();
  const droneSprites = createDroneSprites();
  const knownResourceSprites = createKnownResourceSprites();
  const buildingRequestSprites = createBuildingRequestSprites();
  const collectorSprites = createCollectorSprites();
  const carriedResourceSprite = createCarriedResourceSprite();
  const canvas = ref<HTMLCanvasElement>();
  let context: CanvasRenderingContext2D;

  onMounted(() => {
    if (canvas.value) {
      context = canvas.value.getContext('2d') as CanvasRenderingContext2D;
      context.imageSmoothingEnabled = false;
    }
  });

  const getHoverableSpriteName = (id: string): string => {
    return props.hoveredElement?.id === id || props.activeElement?.id === id ? 'hover' : 'default';
  };

  const drawResource = (resource: Resource): void => {
    drawCircle(context, resource.position, 30, getColor(colors.resource.rgb, 0.3));
  };

  const drawKnownResource = (resource: Resource): void => {
    const size = 40;
    context.drawImage(
      knownResourceSprites[getHoverableSpriteName(resource.id)],
      resource.position.x - 20,
      resource.position.y - 20,
      size,
      size,
    );
  };

  const drawDrone = (playerType: PlayerType, drone: Drone): void => {
    if (drone.attackProgress >= 0.9) {
      context.shadowColor = colors.grey.hex;
      context.shadowBlur = 10;
      drawLine(context, drone.position, drone.target, colors.grey.hex, 3);
      context.shadowBlur = 0;
    }

    const spriteActionName = playerType === 'self' ? drone.action : 'ennemy';
    context.drawImage(
      droneSprites[spriteActionName][drone.direction],
      drone.position.x - 10,
      drone.position.y - 10,
    );

    if (drone.carriedResourceUnits > 0) {
      context.drawImage(carriedResourceSprite, drone.position.x - 5, drone.position.y - 5, 10, 10);
    }
  };

  const drawBuildingRequest = (buildingRequest: BuildingRequest): void => {
    const size = 80;
    context.drawImage(
      buildingRequestSprites[buildingRequest.type],
      buildingRequest.position.x - size / 2,
      buildingRequest.position.y - size / 2,
      size,
      size,
    );

    drawCircularProgress(
      context,
      buildingRequest.position,
      31,
      buildingRequest.progress / 100,
      colors.actions.build.hex,
    );
  };

  const drawCollector = (collector: Resource): void => {
    const size = 80;
    const stockLevel = Math.ceil((collector.stock / collector.initialStock) * 8);

    context.drawImage(
      collectorSprites[stockLevel],
      collector.position.x - size / 2,
      collector.position.y - size / 2,
      size,
      size,
    );
  };

  const drawHive = (playerType: PlayerType, hive: Hive): void => {
    drawCircle(
      context,
      hive.position,
      hive.territoryRadius,
      getColor(colors.players[playerType].rgb, 0.2),
    );

    for (let i = 0; i < hive.knownResources.length; i++) {
      drawKnownResource(hive.knownResources[i]);
    }

    for (let i = 0; i < hive.drones.length; i++) {
      drawDrone(playerType, hive.drones[i]);
    }

    for (let i = 0; i < hive.buildingRequests.length; i++) {
      drawBuildingRequest(hive.buildingRequests[i]);
    }

    for (let i = 0; i < hive.collectors.length; i++) {
      drawCollector(hive.collectors[i]);
    }

    context.drawImage(
      hiveSprites[playerType][hive.level][getHoverableSpriteName(hive.id)],
      hive.position.x - hive.radius,
      hive.position.y - hive.radius,
    );

    if (hive.action !== 'wait') {
      drawCircularProgress(
        context,
        hive.position,
        hive.radius + 8,
        hive.actionProgress / 100,
        colors.hive.actions[hive.action].hex,
        5,
      );
    }
  };

  const redraw = (): void => {
    context.clearRect(0, 0, props.width, props.height);

    for (let i = 0; i < props.resources.length; i++) {
      drawResource(props.resources[i]);
    }

    drawHive('self', props.playerHive);

    for (let i = 0; i < props.otherHives.length; i++) {
      const playerType = 'ennemy';
      drawHive(playerType, props.otherHives[i]);
    }
  };

  return {
    props,
    canvas,
    redraw,
  };
});
</script>
<style lang="scss" scoped>
canvas {
  cursor: cell;
  background-image: url('/public/images/backgrounds/space1.jpg');
}
</style>
