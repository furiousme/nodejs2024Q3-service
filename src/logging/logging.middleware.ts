import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggingService } from 'src/logging/logging.service';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  constructor(private readonly logger: LoggingService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { method, url, query, body } = req;
    const startTime = Date.now();

    res.on('close', () => {
      const status = res.statusCode;
      const duration = Date.now() - startTime;
      this.logger.log(
        `HTTP ${method} ${url} - Query: ${JSON.stringify(
          query,
        )} - Body: ${JSON.stringify(body)} - Status: ${status} - ${duration}ms`,
      );
    });

    next();
  }
}
