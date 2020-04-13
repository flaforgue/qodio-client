/* eslint-disable max-len */

import createBaseSprite from '../create-base-sprite';
import { BaseSprites } from 'src/types';

export default (): BaseSprites => {
  return {
    default: createBaseSprite({
      url: '../../../../../public/images/known-resource.png',
      width: 175,
      height: 175,
    }),
  };
};
