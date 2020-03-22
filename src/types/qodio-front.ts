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
  playerType: PlayerType;
}

export interface Hive extends PlayerEntity {
  radius: number;
  territoryRadius: number;
  drones: Drone[];
}

export type DroneAction = 'waiting' | 'scouting';

export interface Drone extends PlayerEntity {
  action: DroneAction;
}

export interface Resource extends Entity {
  stock: number;
  initialStock: number;
}
