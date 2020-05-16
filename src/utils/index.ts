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
  width?: number,
): void => {
  if (context) {
    context.beginPath();
    context.arc(
      position.x,
      position.y,
      size,
      (-1 / 2) * Math.PI,
      ratio * 2 * Math.PI - (1 / 2) * Math.PI,
    );

    context.lineWidth = width || size / 10;
    context.strokeStyle = color;

    context.stroke();
  }
};

const existsInArray = <T extends IdEntity>(arr: T[], id: string): boolean => {
  return arr.some((elem) => elem.id === id);
};

const removeFromArrayById = <T extends IdEntity>(arr: T[], id: string): T | undefined => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id === id) {
      return arr.splice(i, 1)[0];
    }
  }
};

export {
  Factories,
  getColor,
  drawCircle,
  drawCircularProgress,
  existsInArray,
  removeFromArrayById,
};
