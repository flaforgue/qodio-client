import { CanvasSpriteOptions } from 'src/types';

export default (options: CanvasSpriteOptions): HTMLCanvasElement => {
  const canvas = document.createElement('canvas');
  canvas.width = options.width;
  canvas.height = options.height;
  const context = canvas.getContext('2d') as CanvasRenderingContext2D;

  options.drawFunction(context);

  return canvas;
};
