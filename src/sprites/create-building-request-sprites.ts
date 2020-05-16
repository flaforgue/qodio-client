import { createSpriteFromImage } from 'src/utils';
import { BuildingRequestSprites } from 'src/types';

export default (): BuildingRequestSprites => {
  return {
    collector: createSpriteFromImage({
      url: '/public/images/buildings/incomplete/collector.png',
      width: 286,
      height: 286,
    }),
  };
};
