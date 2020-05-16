import { ImageSpriteOptions, OrientableSprite } from 'src/types';
import { createSpriteFromImage } from 'src/utils';

export default (defaultOptions: ImageSpriteOptions): OrientableSprite => {
  return {
    up: createSpriteFromImage({
      ...defaultOptions,
      url: `${defaultOptions.url}/up.png`,
    }),
    upright: createSpriteFromImage({
      ...defaultOptions,
      url: `${defaultOptions.url}/upright.png`,
    }),
    right: createSpriteFromImage({
      ...defaultOptions,
      url: `${defaultOptions.url}/right.png`,
    }),
    downright: createSpriteFromImage({
      ...defaultOptions,
      url: `${defaultOptions.url}/downright.png`,
    }),
    down: createSpriteFromImage({
      ...defaultOptions,
      url: `${defaultOptions.url}/down.png`,
    }),
    downleft: createSpriteFromImage({
      ...defaultOptions,
      url: `${defaultOptions.url}/downleft.png`,
    }),
    left: createSpriteFromImage({
      ...defaultOptions,
      url: `${defaultOptions.url}/left.png`,
    }),
    upleft: createSpriteFromImage({
      ...defaultOptions,
      url: `${defaultOptions.url}/upleft.png`,
    }),
  };
};
