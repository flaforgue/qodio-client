import SocketService from './services/socket.service';
import CanvasService from './services/canvas.service';

const canvasService = new CanvasService();
const socketService = new SocketService('ws://localhost:3000', canvasService);

requestAnimationFrame(function loop() {
  requestAnimationFrame(loop);
  canvasService.redraw();
});
