import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggingService } from 'src/logging/logging.service';
import { buildLogString } from 'src/utils/build-log-string';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  constructor(private readonly logger: LoggingService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const startTime = Date.now();

    res.on('close', () => {
      const status = res.statusCode;
      const duration = Date.now() - startTime;
      const logString = buildLogString({ req, status, duration });
      this.logger.log(logString);
    });

    next();
  }
}
