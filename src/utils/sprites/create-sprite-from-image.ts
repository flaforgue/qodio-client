import { ImageSpriteOptions } from 'src/types';

export default (options: ImageSpriteOptions): CanvasImageSource => {
  const image = new Image();
  image.src = options.url;
  image.width = options.width;
  image.height = options.height;

  if (options.rotateOptions) {
    image.style.transform = `rotate(${options.rotateOptions.angle}deg)`;
  }

  return image;
};
