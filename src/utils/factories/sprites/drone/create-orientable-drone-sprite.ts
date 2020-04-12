import createSingleDroneSprite from './create-single-drone-sprite';
import { SpriteOptions, OrientableSprite } from '../../../../types';

export default (defaultOptions: SpriteOptions): OrientableSprite => {
  return {
    up: createSingleDroneSprite(defaultOptions),
    upright: createSingleDroneSprite({
      ...defaultOptions,
      rotateOptions: {
        angle: 45,
        translteX: 10,
        translteY: -4,
      },
    }),
    right: createSingleDroneSprite({
      ...defaultOptions,
      rotateOptions: {
        angle: 90,
        translteX: 20,
        translteY: 0,
      },
    }),
    downright: createSingleDroneSprite({
      ...defaultOptions,
      rotateOptions: {
        angle: 135,
        translteX: 24,
        translteY: 10,
      },
    }),
    down: createSingleDroneSprite({
      ...defaultOptions,
      rotateOptions: {
        angle: 180,
        translteX: 20,
        translteY: 20,
      },
    }),
    downleft: createSingleDroneSprite({
      ...defaultOptions,
      rotateOptions: {
        angle: 225,
        translteX: 10,
        translteY: 24,
      },
    }),
    left: createSingleDroneSprite({
      ...defaultOptions,
      rotateOptions: {
        angle: 270,
        translteX: 0,
        translteY: 20,
      },
    }),
    upleft: createSingleDroneSprite({
      ...defaultOptions,
      rotateOptions: {
        angle: 315,
        translteX: -4,
        translteY: 10,
      },
    }),
  };
};
