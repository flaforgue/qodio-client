import existsInArrayById from './array/exists-in-array-by-id';
import removeFromArrayById from './array/remove-from-array-by-id';
import drawCircle from './canvas/draw-circle';
import drawCircularProgress from './canvas/draw-circular-progress';
import createSpriteFromImage from './sprites/create-sprite-from-image';
import createSpriteFromCanvas from './sprites/create-sprite-from-canvas';

const getColor = (data: number[], opacity = 1): string => {
  return `rgba(${data.join(',')}, ${opacity})`;
};

export {
  getColor,
  drawCircle,
  drawCircularProgress,
  existsInArrayById,
  removeFromArrayById,
  createSpriteFromImage,
  createSpriteFromCanvas,
};
