/* eslint-disable max-len */

import createBaseSprite from '../create-base-sprite';
import { CollectorSprites } from 'src/types';

export default (): CollectorSprites => {
  const sprites = {} as CollectorSprites;

  for (let i = 0; i < 9; i++) {
    sprites[i] = createBaseSprite({
      url: `../../../../../public/images/buildings/collector/collector-${i}.png`,
      width: 286,
      height: 286,
    });
  }

  return sprites;
};
