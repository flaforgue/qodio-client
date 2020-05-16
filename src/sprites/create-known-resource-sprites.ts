import { createSpriteFromImage } from 'src/utils';
import { HoverableSprite } from 'src/types';

export default (): HoverableSprite => {
  return {
    default: createSpriteFromImage({
      url: '/public/images/other/known-resource.png',
      width: 40,
      height: 40,
    }),
    hover: createSpriteFromImage({
      url: '/public/images/other/known-resource-hover.png',
      width: 40,
      height: 40,
    }),
  };
};
