import { Position } from 'src/types';

export default (
  context: CanvasRenderingContext2D | null,
  from: Position,
  to: Position,
  color: string,
  width = 1,
  lineCap: CanvasLineCap = 'round',
): void => {
  if (context) {
    context.beginPath();
    context.lineWidth = width;
    context.strokeStyle = color;
    context.lineCap = lineCap;
    context.moveTo(from.x, from.y);
    context.lineTo(to.x, to.y);
    context.stroke();
  }
};
