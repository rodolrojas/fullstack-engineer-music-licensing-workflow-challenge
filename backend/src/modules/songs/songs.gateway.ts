import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Song } from '../../entities/song.entity';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SongsGateway
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

  notifySongCreated(song: Song) {
    this.server.emit('songCreated', song);
  }

  notifySongUpdated(song: Song) {
    this.server.emit('songUpdated', song);
  }
}
