import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { ValidationError as ClassValidatorValidationError } from 'class-validator'
import { ValidationError } from '../../common/errors/validation.error'
import { AppErrorFilter } from './api/app-error.filter'
import { AppModule } from './app.module'
import { AppConfigService } from './config/app/app-config.service'
import { ClassValidatorError } from './core/errors/class-validator.error'
import * as helmet from 'helmet';

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    const appConfigService = app.get(AppConfigService)

    app.setGlobalPrefix(appConfigService.prefix)
    app.use(helmet())
    app.enableCors({ origin: appConfigService.allowedOrigin })
    app.useGlobalFilters(new AppErrorFilter())
    app.useGlobalPipes(new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
        exceptionFactory: (errors: ClassValidatorValidationError[]) => {
            throw new ValidationError('Invalid data!', new ClassValidatorError(errors))
        }
    }))

    await app.listen(appConfigService.port)
}
bootstrap()
