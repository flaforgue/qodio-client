import { Position } from '../types/qodio-front';

const getColor = (data: number[], opacity = 1): string => {
  return `rgba(${data.join(',')}, ${opacity})`;
};

const drawCircle = (
  context: CanvasRenderingContext2D,
  position: Position,
  radius: number,
  color: string,
): void => {
  context.beginPath();
  context.arc(position.x, position.y, radius, 0, 2 * Math.PI);
  context.fillStyle = color;
  context.fill();
};

export { getColor, drawCircle };
