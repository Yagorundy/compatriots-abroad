import { INestApplication, ValidationPipe } from '@nestjs/common'
import { ValidationError as ClassValidatorValidationError } from 'class-validator'
import { ValidationError } from '../../common/errors/validation.error'
import { AppErrorFilter } from './api/app-error.filter'
import { ClassValidatorError } from './core/errors/class-validator.error'

export const configureAppValidation = (app: INestApplication) => {
    app.useGlobalFilters(new AppErrorFilter())
    app.useGlobalPipes(new ValidationPipe({
        transform: true,
        whitelist: true,
        exceptionFactory: (errors: ClassValidatorValidationError[]) => {
            throw new ValidationError('Invalid data!', new ClassValidatorError(errors))
        }
    }))
}
