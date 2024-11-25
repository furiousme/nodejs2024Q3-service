import { Injectable, Logger, Scope } from '@nestjs/common';
import * as fs from 'node:fs';
import * as path from 'node:path';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggingService {
  private readonly logger = new Logger('', {
    timestamp: true,
  });

  private readonly stream: fs.WriteStream;
  private readonly folderPath: string = path.join(
    __dirname, // src/logging
    '..',
    '..',
    'logs',
  );

  constructor() {
    fs.mkdirSync(path.dirname(this.folderPath), { recursive: true });
    this.stream = fs.createWriteStream(path.join(this.folderPath, 'logs.txt'), {
      flags: 'a+',
    });
  }

  log(message, ...args) {
    this.logger.log(message, ...args);
    this.write('LOG', message, ...args);
  }

  error(message: string, ...args) {
    this.logger.error(message, ...args);
    this.write('ERROR', message, ...args);
  }

  warn(message: string, ...args) {
    this.logger.warn(message, ...args);
    this.write('ERROR', message, ...args);
  }

  debug(message: string, ...args) {
    this.logger.debug(message, ...args);
    this.debug('DEBUG', message, ...args);
  }

  write(level: string, message: string, ...args) {
    try {
      const now = new Date().toISOString();
      const logString = `${now} [${level}] ${message} ${
        args.length ? JSON.stringify(args) : ''
      }`;
      this.stream.write('\n');
      this.stream.write(logString);
    } catch (e) {
      this.error('Failed to write into log file', e);
    }
  }
}
