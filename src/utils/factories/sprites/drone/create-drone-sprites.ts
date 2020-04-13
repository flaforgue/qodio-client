import { DroneSprites } from '../../../../types';
import createOrientedDroneSprites from './create-oriented-drone-sprites';
import colors from '../../../../enums/colors';

const defaultOptions = {
  height: 20,
  width: 20,
  imageRendering: 'pixelated',
};

export default (): DroneSprites => {
  const sprites = {} as DroneSprites;
  const actions = ['wait', 'scout', 'collect', 'build', 'attack'];

  for (let i = 0; i < actions.length; i++) {
    sprites[actions[i]] = createOrientedDroneSprites({
      ...defaultOptions,
      color: colors.actions[actions[i]].hex,
    });
  }

  sprites.ennemy = createOrientedDroneSprites({
    ...defaultOptions,
    color: colors.players.ennemy.hex,
  });

  return sprites;
};
