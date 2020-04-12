import { DroneSprites } from '../../../../types';
import createOrientableDroneSprite from './orientable-drone-sprite.factory';
import colors from '../../../../enums/colors';

const defaultOptions = {
  width: 20,
  height: 20,
};

export default (): DroneSprites => {
  return {
    wait: createOrientableDroneSprite({
      ...defaultOptions,
      color: colors.actions.wait.hex,
    }),
    scout: createOrientableDroneSprite({
      ...defaultOptions,
      color: colors.actions.scout.hex,
    }),
    gather: createOrientableDroneSprite({
      ...defaultOptions,
      color: colors.actions.gather.hex,
    }),
    attack: createOrientableDroneSprite({
      ...defaultOptions,
      color: colors.actions.attack.hex,
    }),
    ennemy: createOrientableDroneSprite({
      ...defaultOptions,
      color: colors.players.ennemy.hex,
    }),
  };
};
