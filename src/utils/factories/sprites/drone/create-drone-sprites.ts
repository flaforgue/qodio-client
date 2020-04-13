import { DroneSprites } from '../../../../types';
import createOrientedDroneSprites from './create-oriented-drone-sprites';
import colors from '../../../../enums/colors';

const defaultOptions = {
  height: 20,
  width: 20,
  imageRendering: 'pixelated',
};

export default (): DroneSprites => {
  return {
    wait: createOrientedDroneSprites({
      ...defaultOptions,
      color: colors.actions.wait.hex,
    }),
    scout: createOrientedDroneSprites({
      ...defaultOptions,
      color: colors.actions.scout.hex,
    }),
    gather: createOrientedDroneSprites({
      ...defaultOptions,
      color: colors.actions.gather.hex,
    }),
    attack: createOrientedDroneSprites({
      ...defaultOptions,
      color: colors.actions.attack.hex,
    }),
    ennemy: createOrientedDroneSprites({
      ...defaultOptions,
      color: colors.players.ennemy.hex,
    }),
  };
};
