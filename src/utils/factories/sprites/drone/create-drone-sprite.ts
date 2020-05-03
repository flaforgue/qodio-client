/* eslint-disable max-len */

import { SpriteOptions } from '../../../../types';
import createBaseSprite from '../create-base-sprite';

export default (spriteOptions: Omit<SpriteOptions, 'paths'>): CanvasImageSource => {
  return createBaseSprite({
    ...spriteOptions,
    url: '../../../../../public/images/drones/drone.png',
  });
};
