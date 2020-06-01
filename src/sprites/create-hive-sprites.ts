import { createSpriteFromImage } from 'src/utils';
import { HiveSprites } from 'src/types';

export default (): HiveSprites => {
  const sprites = {} as HiveSprites;
  const options = [
    {
      type: 'self',
      sizes: [175, 200, 225],
    },
    {
      type: 'ennemy',
      sizes: [175, 200, 225],
    },
  ];

  for (let i = 0; i < options.length; i++) {
    sprites[options[i].type] = {};
    for (let j = 1; j < options[i].sizes.length + 1; j++) {
      sprites[options[i].type][j] = {
        default: createSpriteFromImage({
          url: `/public/images/buildings/hive/${options[i].type}/level-${j}.png`,
          width: options[i].sizes[j],
          height: options[i].sizes[j],
        }),
        hover: createSpriteFromImage({
          url: `/public/images/buildings/hive/${options[i].type}/level-${j}-hover.png`,
          width: options[i].sizes[j],
          height: options[i].sizes[j],
        }),
      };
    }
  }

  return sprites;
};
