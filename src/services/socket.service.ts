import SocketIO from 'socket.io-client';
import { Game, Player } from '../types/qodio-front';
import CanvasService from './canvas.service';

export default class SocketService {
  private _socket: SocketIOClient.Socket;
  private _canvasService: CanvasService;
  private _playerId: string;

  public constructor(url: string, canvasService: CanvasService) {
    this._socket = SocketIO(url);
    this._canvasService = canvasService;

    this._socket.on('game.create', (game: Game) => {
      this._canvasService.canvasHeight = game.board.height;
      this._canvasService.canvasWidth = game.board.width;
    });

    this._socket.on('self.create', (player: Player) => {
      this._playerId = player.id;
    });

    this._socket.on('game.tick', (game: Game) => {
      this._canvasService.reset();

      game.players.forEach((player) => {
        const playerType = player.id === this._playerId ? 'self' : 'ennemy';
        this._canvasService.addHive(player.hive, playerType);
        this._canvasService.addDrones(player.hive.drones, playerType);
        this._canvasService.addResources(game.board.resources);
        // this._canvasService.addKnownResources(player.knownResources);
      });
    });

    this._socket.on('game.stop', () => {
      this._canvasService.reset();
    });
  }
}
