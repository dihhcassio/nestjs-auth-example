import { readFileSync } from 'fs';
import { Logger } from '@nestjs/common';
import * as path from 'path';

export function versionProject() {
  const logger = new Logger('versionProject');
  try {
    const projectFilePath = path.resolve(__dirname, '..', 'package.json');
    const packageJson = JSON.parse(
      readFileSync(projectFilePath, { encoding: 'utf8' }),
    );
    return packageJson.version;
  } catch (error) {
    logger.error(error);
    return '0.0.0';
  }
}
