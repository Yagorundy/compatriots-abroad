import { ExceptionFilter, Catch, ArgumentsHost, Logger } from '@nestjs/common';
import { Response } from 'express';
import { AppError } from '../../../../common/errors/app.error';

@Catch(AppError)
export class AppErrorFilter implements ExceptionFilter {
    private readonly logger = new Logger(AppErrorFilter.name)

    catch(error: AppError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        response
            .status(error.statusCode)
            .json({
                code: error.code,
                message: error.message
            });

        this.logErrorStack(error)
    }

    logErrorStack(error: AppError | Error) {
        if (error instanceof AppError && error.parent) {
            this.logErrorStack(error.parent)
        }
        this.logger.error(error.message, error.stack)
    }
}
