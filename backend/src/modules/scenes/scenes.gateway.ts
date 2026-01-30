import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Scene } from '../../entities/scene.entity';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ScenesGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  notifySceneCreated(scene: Scene) {
    this.server.emit('sceneCreated', scene);
  }

  notifySceneUpdated(scene: Scene) {
    this.server.emit('sceneUpdated', scene);
  }
}
