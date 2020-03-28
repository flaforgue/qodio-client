import { Hive, PlayerType, Drone, Resource } from '../types/qodio-front';
import colors from '../enums/colors';
import { getColor, drawCircle } from '../utils';

export default class CanvasService {
  private _boardCanvas: HTMLCanvasElement;
  private _boardContext: CanvasRenderingContext2D;

  private _dronesCanvas: HTMLCanvasElement;
  private _dronesContext: CanvasRenderingContext2D;

  private _hives: Hive[] = [];
  private _drones: Drone[] = [];
  private _resources: Resource[] = [];
  private _knownResources: Resource[] = [];

  public constructor() {
    this._boardCanvas = document.getElementById('board') as HTMLCanvasElement;
    this._boardContext = this._boardCanvas.getContext('2d');
    this._dronesCanvas = document.getElementById('drones') as HTMLCanvasElement;
    this._dronesContext = this._dronesCanvas.getContext('2d');
  }

  public set canvasHeight(height: number) {
    this._boardCanvas.height = height;
    this._boardCanvas.style.height = `${height}px`;
    this._dronesCanvas.height = height;
    this._dronesCanvas.style.height = `${height}px`;
  }

  public set canvasWidth(width: number) {
    this._boardCanvas.width = width;
    this._boardCanvas.style.width = `${width}px`;
    this._dronesCanvas.width = width;
    this._dronesCanvas.style.width = `${width}px`;
  }

  public redraw(): void {
    this._redrawBoardCanvas();
    this._redrawDronesCanvas();
  }

  private _redrawDronesCanvas(): void {
    this._dronesContext.clearRect(0, 0, this._dronesCanvas.width, this._dronesCanvas.height);

    for (let i = 0; i < this._drones.length; i++) {
      this._drawDrone(this._drones[i]);
    }
  }

  public addDrones(playerType: PlayerType, drones: Drone[] = []): void {
    this._drones.push(...drones.map((drone) => ({ ...drone, playerType })));
  }

  private _drawDrone(drone: Drone): void {
    drawCircle(this._dronesContext, drone.position, 5, getColor(colors.actions[drone.action]));
    if (drone.carriedResourceUnits > 0) {
      drawCircle(this._dronesContext, drone.position, 3, getColor(colors.knownResource));
    }
  }

  private _redrawBoardCanvas(): void {
    this._boardContext.clearRect(0, 0, this._boardCanvas.width, this._boardCanvas.height);

    for (let i = 0; i < this._hives.length; i++) {
      this._drawHive(this._hives[i]);
    }

    for (let i = 0; i < this._resources.length; i++) {
      this._drawResource(this._resources[i]);
    }

    for (let i = 0; i < this._knownResources.length; i++) {
      this._drawKnownResource(this._knownResources[i]);
    }
  }

  public reset(): void {
    this._hives = [];
    this._drones = [];
    this._resources = [];
    this._knownResources = [];
  }

  public addHive(playerType: PlayerType, hive: Hive): void {
    this._hives.push({ ...hive, playerType });
  }

  public addKnownResources(resources: Resource[] = []): void {
    this._knownResources.push(...resources);
  }

  public addResources(resources: Resource[] = []): void {
    this._resources.push(...resources);
  }

  private _drawHive(hive: Hive): void {
    drawCircle(
      this._boardContext,
      hive.position,
      hive.territoryRadius,
      getColor(colors.players[hive.playerType], 0.2),
    );

    drawCircle(
      this._boardContext,
      hive.position,
      hive.radius,
      getColor(colors.players[hive.playerType]),
    );
  }

  private _drawResource(resource: Resource): void {
    drawCircle(
      this._boardContext,
      resource.position,
      resource.stock / 5,
      getColor(colors.resource),
    );
  }

  private _drawKnownResource(resource: Resource): void {
    drawCircle(
      this._boardContext,
      resource.position,
      resource.stock / 5,
      getColor(colors.knownResource),
    );
  }
}
