export type Position = {
  x: number;
  y: number;
};

export type Game = {
  board: Board;
  players: Player[];
  maxPlayers: number;
};

export type Board = {
  width: number;
  height: number;
  resources: Resource[];
};

export type PlayerType = 'self' | 'ennemy';

export type Player = {
  hive: Hive;
  id: string;
  knownResources: Resource[];
};

export interface Entity {
  id: string;
  position: Position;
}

export interface PlayerEntity extends Entity {
  playerId: string;
}

export interface Hive extends PlayerEntity {
  radius: number;
  territoryRadius: number;
  stock: number;
  maxStock: number;
  maxPopulation: number;
  drones: Drone[];
}

export type DroneAction = 'wait' | 'scout' | 'gather' | 'attack';

export type Direction =
  | 'up'
  | 'upright'
  | 'right'
  | 'downright'
  | 'down'
  | 'downleft'
  | 'left'
  | 'upleft';

export interface Drone extends PlayerEntity {
  action: DroneAction;
  carriedResourceUnits: number;
  direction: Direction;
}

export interface Resource extends Entity {
  stock: number;
  initialStock: number;
}

export type DroneSprites = Record<DroneAction | 'ennemy', OrientableSprite>;

export type OrientableSprite = Record<Direction, HTMLCanvasElement>;

export type SpriteOptions = {
  width: number;
  height: number;
  color: string;
  rotateOptions?: RotateOptions;
};

export type RotateOptions = {
  angle: number;
  translteX: number;
  translteY: number;
};