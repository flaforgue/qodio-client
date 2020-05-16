/* eslint-disable max-len */

import createBaseSprite from './create-base-sprite';
import { BuildingRequestSprites } from 'src/types';

export default (): BuildingRequestSprites => {
  return {
    collector: createBaseSprite({
      url: '../../../../../public/images/buildings/incomplete/collector.png',
      width: 286,
      height: 286,
    }),
  };
};
