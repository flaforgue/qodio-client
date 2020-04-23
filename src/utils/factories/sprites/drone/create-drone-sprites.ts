import { DroneSprites } from '../../../../types';
import createOrientedDroneSprites from './create-oriented-drone-sprites';
import { colors, droneActions } from '../../../../enums';

const defaultOptions = {
  height: 20,
  width: 20,
  imageRendering: 'pixelated',
};

export default (): DroneSprites => {
  const sprites = {} as DroneSprites;

  for (let i = 0; i < droneActions.length; i++) {
    sprites[droneActions[i]] = createOrientedDroneSprites({
      ...defaultOptions,
      color: colors.actions[droneActions[i]].hex,
    });
  }

  sprites.ennemy = createOrientedDroneSprites({
    ...defaultOptions,
    color: colors.players.ennemy.hex,
  });

  return sprites;
};
