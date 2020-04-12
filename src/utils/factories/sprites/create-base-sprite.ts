import { SpriteOptions } from '../../../types';

export default (paths: string[], spriteOptions: SpriteOptions): HTMLCanvasElement => {
  const canvas = document.createElement('canvas');
  canvas.width = spriteOptions.width;
  canvas.height = spriteOptions.height;
  canvas.style['image-rendering'] = 'pixelated';
  const context = canvas.getContext('2d') as CanvasRenderingContext2D;

  if (spriteOptions.rotateOptions) {
    context.translate(spriteOptions.rotateOptions.translteX, spriteOptions.rotateOptions.translteY);
    context.rotate((spriteOptions.rotateOptions.angle * Math.PI) / 180);
    context.translate(0, 0);
  }

  context.beginPath();
  context.fillStyle = spriteOptions.color;
  for (let i = 0; i < paths.length; i++) {
    context.fill(new Path2D(paths[i]));
  }

  return canvas;
};
