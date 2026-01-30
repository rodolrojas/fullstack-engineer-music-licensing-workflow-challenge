import { Injectable } from '@nestjs/common';
import type CommonAPIResponse from './types/CommonAPIResponse.type';

@Injectable()
export class AppService {
  getHello(): CommonAPIResponse<null> {
    return {
      status: 'success',
      message: 'Hello World!',
    };
  }
}
