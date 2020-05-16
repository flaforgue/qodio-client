import { Position } from 'src/types';

export default (
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
