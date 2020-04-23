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
};

export interface Entity {
  id: string;
  position: Position;
}

export interface PlayerEntity extends Entity {
  playerId: string;
}

export interface BuildingRequest extends PlayerEntity {
  type: string;
  progress: number;
}

export interface Hive extends PlayerEntity {
  level: number;
  radius: number;
  territoryRadius: number;
  stock: number;
  maxStock: number;
  maxPopulation: number;
  drones: Drone[];
  knownResources: Resource[];
  collectors: Resource[];
  buildingRequests: BuildingRequest[];
  actionsNbDrones: Record<DroneAction, number>;
}

export type DroneAction = 'wait' | 'scout' | 'collect' | 'build';

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

export type BaseSprites = {
  default: CanvasImageSource;
};

export type HiveLevel = 1 | 2 | 3;
export type HiveSprites = Record<HiveLevel, CanvasImageSource>;
export type BuildingType = 'collector';
export type BuildingRequestSprites = Record<BuildingType, CanvasImageSource>;
export type CollectorStockLevel = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type CollectorSprites = Record<CollectorStockLevel, CanvasImageSource>;
export type OrientableSprite = Record<Direction, CanvasImageSource>;
export type DroneSprites = Record<DroneAction | 'ennemy', OrientableSprite>;

export type PathOptions = {
  path: string;
  color: string;
};

export type SpriteOptions = {
  width: number;
  height: number;
  color?: string;
  url?: string;
  pathsOptions?: PathOptions[];
  rotateOptions?: RotateOptions;
  imageRendering?: string;
};

export type RotateOptions = {
  angle: number;
  translteX: number;
  translteY: number;
};
