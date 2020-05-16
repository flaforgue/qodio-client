/* eslint-disable max-len */

import createBaseSprite from './create-base-sprite';
import { HoverableSprite } from 'src/types';

export default (): HoverableSprite => {
  return {
    default: createBaseSprite({
      url: '../../../../../public/images/other/known-resource.png',
      width: 40,
      height: 40,
    }),
    hover: createBaseSprite({
      url: '../../../../../public/images/other/known-resource-hover.png',
      width: 40,
      height: 40,
    }),
  };
};
