/* eslint-disable max-len */

import createBaseSprite from '../create-base-sprite';
import { HiveSprites } from 'src/types';

export default (): HiveSprites => {
  const sprites = {} as HiveSprites;
  const sizes = [175, 200, 225];

  for (let i = 0; i < sizes.length; i++) {
    sprites[i] = {
      default: createBaseSprite({
        url: `../../../../../public/images/buildings/base/base-${i}.png`,
        width: sizes[i],
        height: sizes[i],
      }),
      hover: createBaseSprite({
        url: `../../../../../public/images/buildings/base/base-${i}-hover.png`,
        width: sizes[i],
        height: sizes[i],
      }),
    };
  }

  return sprites;
};
