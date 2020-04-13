<template>
  <div class="app-canvas">
    <canvas ref="canvas" :height="props.height" :width="props.width"></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { Hive, Drone, Resource, PlayerType } from '../types';
import { drawCircle, getColor } from '../utils';
import colors from '../enums/colors';
import Factory from '../utils/factories';

type AppCanvasProps = {
  height: number;
  width: number;
  resources: Resource[];
  knownResources: Resource[];
  playerHive: Hive;
  otherHives: Hive[];
};

export default defineComponent((props: AppCanvasProps) => {
  const hiveSprites = Factory.createHiveSprites();
  const droneSprites = Factory.createDroneSprites();
  const resourceSprites = Factory.createResourceSprites();
  const canvas = ref<HTMLCanvasElement>();
  let context: CanvasRenderingContext2D;

  onMounted(() => {
    if (canvas.value) {
      context = canvas.value.getContext('2d') as CanvasRenderingContext2D;
    }
  });

  const drawDrone = (playerType: PlayerType, drone: Drone): void => {
    const spriteActionName = playerType === 'self' ? drone.action : 'ennemy';

    context.drawImage(
      droneSprites[spriteActionName][drone.direction],
      drone.position.x - 10,
      drone.position.y - 10,
    );

    if (drone.carriedResourceUnits > 0) {
      drawCircle(context, drone.position, 3, colors.knownResource.hex);
    }
  };

  const drawHive = (playerType: PlayerType, hive: Hive): void => {
    drawCircle(
      context,
      hive.position,
      hive.territoryRadius,
      getColor(colors.players[playerType].rgb, 0.2),
    );

    for (let i = 0; i < hive.drones.length; i++) {
      drawDrone(playerType, hive.drones[i]);
    }

    context.drawImage(
      hiveSprites[hive.level],
      Math.floor(hive.position.x - hive.radius / 2),
      Math.floor(hive.position.y - hive.radius / 2),
    );
  };

  const drawKnownResource = (resource: Resource): void => {
    const size = 30;
    context.drawImage(
      resourceSprites.default,
      resource.position.x - 15,
      resource.position.y - size + 5,
      size,
      size,
    );
  };

  const drawResource = (resource: Resource): void => {
    drawCircle(context, resource.position, 30, getColor(colors.resource.rgb, 0.3));
  };

  const redraw = (): void => {
    context.clearRect(0, 0, props.width, props.height);

    for (let i = 0; i < props.resources.length; i++) {
      drawResource(props.resources[i]);
    }

    for (let i = 0; i < props.knownResources.length; i++) {
      drawKnownResource(props.knownResources[i]);
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
  background-image: url('/public/images/backgrounds/desert1.jpg');
}
</style>
