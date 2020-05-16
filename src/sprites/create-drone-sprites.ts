import { DroneSprites } from 'src/types';
import { createOrientableSprites } from 'src/utils';
import { droneActions } from 'src/enums';

const defaultOptions = {
  height: 20,
  width: 20,
};

export default (): DroneSprites => {
  const sprites = {} as DroneSprites;

  for (let i = 0; i < droneActions.length; i++) {
    sprites[droneActions[i]] = createOrientableSprites({
      ...defaultOptions,
      url: `/public/images/drones/${droneActions[i]}`,
    });
  }

  sprites.ennemy = createOrientableSprites({
    ...defaultOptions,
    url: '/public/images/drones/ennemy',
  });

  return sprites;
};
