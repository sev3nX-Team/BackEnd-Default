import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { logger } from '@shared/helpers/pino';
import AppError from '@shared/errors/AppError';

export class HandleErrors {
  public static setup(): ErrorRequestHandler {
    const middleware = new HandleErrors();
    return (
      error: Error,
      request: Request,
      response: Response,
      next: NextFunction,
    ): void => middleware.use(error, request, response, next);
  }

  public use(
    error: Error,
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    if (response.headersSent) {
      return next(error);
    }

    this.handle(error, response);
  }

  public handle(err: Error, response: Response): void {
    if (err instanceof AppError) {
      logger.info(err);
      response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
      return;
    } else {
      logger.info('\x1b[31m', err);
      response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: 'error',
        message: 'Internal server error. Try again later.',
      });
      return;
    }
  }
}
