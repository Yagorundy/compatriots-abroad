import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { ValidationError as ClassValidatorValidationError } from 'class-validator'
import { ValidationError } from '../../common/errors/validation.error'
import { AppErrorFilter } from './api/filters/app-error.filter'
import { AppModule } from './app.module'
import { AppConfigService } from './config/app/app-config.service'
import { ClassValidatorError } from './core/errors/class-validator.error'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    app.useGlobalFilters(new AppErrorFilter())
    app.useGlobalPipes(new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
        exceptionFactory: (errors: ClassValidatorValidationError[]) => {
            throw new ValidationError('Invalid data!', new ClassValidatorError(errors))
        }
    }))

    const appConfigService = app.get(AppConfigService)
    await app.listen(appConfigService.port)
}
bootstrap()
