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

export interface IdEntity {
  id: string;
}

export interface Entity extends IdEntity {
  position: Position;
}

export interface PlayerEntity extends Entity {
  playerId: string;
}

export interface BuildingRequest extends PlayerEntity {
  type: string;
  progress: number;
}

export type HiveAction = 'wait' | 'createDrone';

export interface Hive extends PlayerEntity {
  level: number;
  action: HiveAction;
  actionProgress: number;
  radius: number;
  territoryRadius: number;
  stock: number;
  maxStock: number;
  maxPopulation: number;
  drones: Drone[];
  knownResources: Resource[];
  nbResourcesDiscovered: number;
  collectors: Resource[];
  buildingRequests: BuildingRequest[];
  actionsNbDrones: Record<DroneAction, number>;
}

export type DroneAction = 'wait' | 'scout' | 'collect' | 'build' | 'recycle' | 'defend' | 'attack';

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

export type HoverableSprite = {
  default: CanvasImageSource;
  hover: CanvasImageSource;
};

export type HiveLevel = 1 | 2 | 3;
export type HiveSprites = Record<PlayerType, Record<HiveLevel, HoverableSprite>>;
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

export type ImageSpriteOptions = {
  width: number;
  height: number;
  url: string;
  rotateOptions?: RotateOptions;
};

export type CanvasSpriteOptions = {
  width: number;
  height: number;
  drawFunction: (context: CanvasRenderingContext2D) => void;
};

export type RotateOptions = {
  angle: number;
  translteX: number;
  translteY: number;
};

export type HoverableElement = {
  id: string;
  path: Path2D;
  type: 'hive' | 'knownResource';
  data: Hive | Resource;
};
