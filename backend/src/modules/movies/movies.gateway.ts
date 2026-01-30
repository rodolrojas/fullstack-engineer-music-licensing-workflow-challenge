import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Movie } from '../../entities/movie.entity';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MoviesGateway
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

  notifyMovieCreated(movie: Movie) {
    this.server.emit('movieCreated', movie);
  }

  notifyMovieUpdated(movie: Movie) {
    this.server.emit('movieUpdated', movie);
  }
}
