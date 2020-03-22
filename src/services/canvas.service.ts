import { Hive, PlayerType, Drone, Resource, Position } from '../types/qodio-front';
import colors from '../enums/colors';
import { getColor } from '../utils';

export default class CanvasService {
  private _canvas: HTMLCanvasElement;
  private _context: CanvasRenderingContext2D;
  private _hives: Hive[] = [];
  private _drones: Drone[] = [];
  private _resources: Resource[] = [];
  private _knownResources: Resource[] = [];

  public constructor() {
    this._canvas = document.getElementById('board') as HTMLCanvasElement;
    this._context = this._canvas.getContext('2d');
  }

  public set canvasHeight(height: number) {
    this._canvas.height = height;
  }

  public set canvasWidth(width: number) {
    this._canvas.width = width;
  }

  public redraw(): void {
    this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
    this._hives.forEach((hive) => this._drawHive(hive));
    this._drones.forEach((drone) => this._drawDrone(drone));
    this._resources.forEach((resource) => this._drawResource(resource));
    this._knownResources.forEach((resource) => this._drawKnownResource(resource));
  }

  public reset(): void {
    this._hives = [];
    this._drones = [];
  }

  public addHive(hive: Hive, playerType: PlayerType): void {
    this._hives.push({ ...hive, playerType });
  }

  public addDrones(drones: Drone[], playerType: PlayerType): void {
    this._drones.push(...drones.map((drone) => ({ ...drone, playerType })));
  }

  public addKnownResources(resources: Resource[]): void {
    this._knownResources.push(...resources);
  }

  public addResources(resources: Resource[]): void {
    this._resources.push(...resources);
  }

  private _drawHive(hive: Hive): void {
    this._drawCircle(
      hive.position,
      hive.territoryRadius,
      getColor(colors.players[hive.playerType], 0.2),
    );

    this._drawCircle(hive.position, hive.radius, getColor(colors.players[hive.playerType]));
  }

  private _drawDrone(drone: Drone): void {
    this._drawCircle(drone.position, 5, getColor(colors.actions[drone.action]));
  }

  private _drawResource(resource: Resource): void {
    this._drawCircle(resource.position, resource.stock / 5, getColor(colors.resource));
  }

  private _drawKnownResource(resource: Resource): void {
    this._drawCircle(resource.position, resource.stock / 5, getColor(colors.players.self));
  }

  private _drawCircle(position: Position, radius: number, color: string): void {
    this._context.beginPath();
    this._context.arc(position.x, position.y, radius, 0, 2 * Math.PI);
    this._context.fillStyle = color;
    this._context.fill();
  }
}
