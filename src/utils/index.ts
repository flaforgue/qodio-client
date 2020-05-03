import { Position, IdEntity } from '../types';
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

const drawCircularProgress = (
  context: CanvasRenderingContext2D | null,
  position: Position,
  size: number,
  ratio: number,
  color: string,
): void => {
  if (context) {
    context.beginPath();
    context.arc(
      position.x,
      position.y,
      (size / 100) * 85,
      (-1 / 2) * Math.PI,
      ratio * 2 * Math.PI - (1 / 2) * Math.PI,
    );

    context.lineWidth = (size / 100) * 10;
    context.strokeStyle = color;

    //fin du dessin
    context.stroke();
  }
};

const existsInArray = <T extends IdEntity>(arr: T[], id: string): boolean => {
  return arr.some((elem) => elem.id === id);
};

export { Factories, getColor, drawCircle, drawCircularProgress, existsInArray };
