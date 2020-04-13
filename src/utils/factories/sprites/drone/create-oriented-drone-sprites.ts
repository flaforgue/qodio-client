import createDroneSprite from './create-drone-sprite';
import { SpriteOptions, OrientableSprite } from '../../../../types';

export default (defaultOptions: Omit<SpriteOptions, 'paths'>): OrientableSprite => {
  return {
    up: createDroneSprite(defaultOptions),
    upright: createDroneSprite({
      ...defaultOptions,
      rotateOptions: {
        angle: 45,
        translteX: 10,
        translteY: -4,
      },
    }),
    right: createDroneSprite({
      ...defaultOptions,
      rotateOptions: {
        angle: 90,
        translteX: 20,
        translteY: 0,
      },
    }),
    downright: createDroneSprite({
      ...defaultOptions,
      rotateOptions: {
        angle: 135,
        translteX: 24,
        translteY: 10,
      },
    }),
    down: createDroneSprite({
      ...defaultOptions,
      rotateOptions: {
        angle: 180,
        translteX: 20,
        translteY: 20,
      },
    }),
    downleft: createDroneSprite({
      ...defaultOptions,
      rotateOptions: {
        angle: 225,
        translteX: 10,
        translteY: 24,
      },
    }),
    left: createDroneSprite({
      ...defaultOptions,
      rotateOptions: {
        angle: 270,
        translteX: 0,
        translteY: 20,
      },
    }),
    upleft: createDroneSprite({
      ...defaultOptions,
      rotateOptions: {
        angle: 315,
        translteX: -4,
        translteY: 10,
      },
    }),
  };
};
