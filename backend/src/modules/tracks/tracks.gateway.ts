import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Track } from '../../entities/track.entity';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class TracksGateway
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

  notifyTrackCreated(track: Track) {
    this.server.emit('trackCreated', track);
  }

  notifyTrackUpdated(track: Track) {
    this.server.emit('trackUpdated', track);
  }

  notifyLicensingStatusUpdated(track: Track) {
    this.server.emit('licensingStatusUpdated', track);
  }

  notifyTrackDeleted(trackId: string) {
    this.server.emit('trackDeleted', { id: trackId });
  }
}
