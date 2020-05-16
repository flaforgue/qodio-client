import { Position } from 'src/types';

export default (
  context: CanvasRenderingContext2D | null,
  position: Position,
  size: number,
  ratio: number,
  color: string,
  width?: number,
): void => {
  if (context) {
    context.beginPath();
    context.arc(position.x, position.y, size, -0.5 * Math.PI, ratio * 2 * Math.PI - 0.5 * Math.PI);

    context.lineWidth = width || size / 10;
    context.strokeStyle = color;

    context.stroke();
  }
};
