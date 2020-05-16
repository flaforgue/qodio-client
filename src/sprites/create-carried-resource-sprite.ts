import createSpriteFromCanvas from 'src/utils/sprites/create-sprite-from-canvas';
import { colors } from 'src/enums';
import { drawCircle } from 'src/utils';

export default (): CanvasImageSource => {
  const drawFunction = (context: CanvasRenderingContext2D): void => {
    console.log(context);
    drawCircle(context, { x: 0, y: 0 }, 3, colors.knownResource.hex);
  };

  return createSpriteFromCanvas({
    width: 6,
    height: 6,
    drawFunction,
  });
};
