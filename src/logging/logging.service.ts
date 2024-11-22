import { Injectable, Logger, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggingService {
  private readonly logger = new Logger(LoggingService.name, {
    timestamp: true,
  });

  log(message: string, context?: string) {
    this.logger.log(context ? [...message, context] : message);
  }

  error(message: string, stackTrace?: string, context?: string) {
    this.logger.error(message, stackTrace, context);
  }

  warn(message: string, context?: string) {
    this.logger.warn(message, context);
  }

  debug(message: string, context?: string) {
    if (process.env.LOG_LEVEL === 'debug') {
      this.logger.debug(message, context);
    }
  }
}
