import { SpriteOptions, PathOptions } from '../../../types';

const createFromPaths = (
  context: CanvasRenderingContext2D,
  pathsOptions: PathOptions[],
  defaultColor?: string,
): void => {
  context.beginPath();
  for (let i = 0; i < pathsOptions.length; i++) {
    context.strokeStyle = pathsOptions[i].color ?? defaultColor;
    context.stroke(new Path2D(pathsOptions[i].path));
  }
};

export default (spriteOptions: SpriteOptions): CanvasImageSource => {
  const canvas = document.createElement('canvas');
  canvas.width = spriteOptions.width;
  canvas.height = spriteOptions.height;
  canvas.style['image-rendering'] = spriteOptions.imageRendering ?? 'auto';
  const context = canvas.getContext('2d') as CanvasRenderingContext2D;

  if (spriteOptions.rotateOptions) {
    context.translate(spriteOptions.rotateOptions.translteX, spriteOptions.rotateOptions.translteY);
    context.rotate((spriteOptions.rotateOptions.angle * Math.PI) / 180);
    context.translate(0, 0);
  }

  if (spriteOptions.url) {
    const image = new Image();
    image.src = spriteOptions.url;
    image.width = spriteOptions.width;
    image.height = spriteOptions.height;

    return image;
  } else if (spriteOptions.pathsOptions) {
    createFromPaths(context, spriteOptions.pathsOptions, spriteOptions.color);
  }

  return canvas;
};
