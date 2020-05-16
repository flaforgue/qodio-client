import createSpriteFromCanvas from 'src/utils/sprites/create-sprite-from-canvas';
import { colors } from 'src/enums';
import { drawCircle } from 'src/utils';

export default (): CanvasImageSource => {
  const drawFunction = (context: CanvasRenderingContext2D): void => {
    drawCircle(context, { x: 5, y: 5 }, 5, colors.knownResource.hex);
  };

  const canvas = createSpriteFromCanvas({
    width: 10,
    height: 10,
    drawFunction,
  });

  return canvas;
};
