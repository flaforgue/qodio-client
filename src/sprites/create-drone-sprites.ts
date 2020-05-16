import { DroneSprites } from '../types';
import createOrientableDroneSprites from './create-orientable-sprites';
import { droneActions } from '../enums';

const defaultOptions = {
  height: 20,
  width: 20,
};

export default (): DroneSprites => {
  const sprites = {} as DroneSprites;

  for (let i = 0; i < droneActions.length; i++) {
    sprites[droneActions[i]] = createOrientableDroneSprites({
      ...defaultOptions,
      url: `./../../../../../public/images/drones/${droneActions[i]}`,
    });
  }

  sprites.ennemy = createOrientableDroneSprites({
    ...defaultOptions,
    url: './../../../../../public/images/drones/ennemy',
  });

  return sprites;
};
