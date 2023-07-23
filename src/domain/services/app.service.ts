import { Injectable } from '@nestjs/common';
import { versionProject } from 'src/app.version';

@Injectable()
export class AppService {
  getHello(): string {
    return `Api Version: ${versionProject()}`;
  }
}
