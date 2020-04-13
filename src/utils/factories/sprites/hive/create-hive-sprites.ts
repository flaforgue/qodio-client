/* eslint-disable max-len */

import createBaseSprite from '../create-base-sprite';
import { HiveSprites } from 'src/types';

export default (): HiveSprites => {
  return {
    1: createBaseSprite({
      url: '../../../../../public/images/buildings/base/base-1.png',
      width: 175,
      height: 175,
    }),
    2: createBaseSprite({
      url: '../../../../../public/images/buildings/base/base-2.png',
      width: 200,
      height: 200,
    }),
    3: createBaseSprite({
      url: '../../../../../public/images/buildings/base/base-3.png',
      width: 225,
      height: 225,
    }),
  };
};
