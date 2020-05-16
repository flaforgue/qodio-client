import { createSpriteFromImage } from 'src/utils';
import { CollectorSprites } from 'src/types';

export default (): CollectorSprites => {
  const sprites = {} as CollectorSprites;

  for (let i = 0; i < 9; i++) {
    sprites[i] = createSpriteFromImage({
      url: `/public/images/buildings/collector/collector-${i}.png`,
      width: 286,
      height: 286,
    });
  }

  return sprites;
};
