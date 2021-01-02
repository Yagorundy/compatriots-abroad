import { NestFactory } from '@nestjs/core'
import { AppErrorFilter } from './api/filters/app-error.filter'
import { AppModule } from './app.module'
import { AppConfigService } from './config/app/app-config.service'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    app.useGlobalFilters(new AppErrorFilter())

    const appConfigService = app.get(AppConfigService)
    await app.listen(appConfigService.port)
}
bootstrap()
