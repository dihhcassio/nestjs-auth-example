import { HttpException, HttpStatus } from '@nestjs/common';

export class NotContentException extends HttpException {
  constructor() {
    super('Not Content', HttpStatus.NO_CONTENT);
  }
}
