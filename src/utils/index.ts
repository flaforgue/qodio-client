import { Position } from '../types';
import Factories from './factories';

const getColor = (data: number[], opacity = 1): string => {
  return `rgba(${data.join(',')}, ${opacity})`;
};

const drawCircle = (
  context: CanvasRenderingContext2D | null,
  position: Position,
  radius: number,
  color: string,
): void => {
  if (context) {
    context.beginPath();
    context.arc(position.x, position.y, radius, 0, 2 * Math.PI);
    context.fillStyle = color;
    context.fill();
  }
};

export { Factories, getColor, drawCircle };
