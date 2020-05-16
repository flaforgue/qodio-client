import { SpriteOptions, OrientableSprite } from '../types';
import createBaseSprite from './create-base-sprite';

export default (defaultOptions: Omit<SpriteOptions, 'paths'>): OrientableSprite => {
  return {
    up: createBaseSprite({
      ...defaultOptions,
      url: `${defaultOptions.url}/up.png`,
    }),
    upright: createBaseSprite({
      ...defaultOptions,
      url: `${defaultOptions.url}/upright.png`,
    }),
    right: createBaseSprite({
      ...defaultOptions,
      url: `${defaultOptions.url}/right.png`,
    }),
    downright: createBaseSprite({
      ...defaultOptions,
      url: `${defaultOptions.url}/downright.png`,
    }),
    down: createBaseSprite({
      ...defaultOptions,
      url: `${defaultOptions.url}/down.png`,
    }),
    downleft: createBaseSprite({
      ...defaultOptions,
      url: `${defaultOptions.url}/downleft.png`,
    }),
    left: createBaseSprite({
      ...defaultOptions,
      url: `${defaultOptions.url}/left.png`,
    }),
    upleft: createBaseSprite({
      ...defaultOptions,
      url: `${defaultOptions.url}/upleft.png`,
    }),
  };
};
