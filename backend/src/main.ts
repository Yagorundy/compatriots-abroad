import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { AppConfigService } from './config/app/app-config.service'
import * as helmet from 'helmet'
import { configureAppValidation } from './configure-app-validation'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    const appConfigService = app.get(AppConfigService)

    app.setGlobalPrefix(appConfigService.prefix)
    app.use(helmet())
    app.enableCors({ origin: appConfigService.allowedOrigin })
    configureAppValidation(app)

    await app.listen(appConfigService.port, appConfigService.host, async () => {
        new Logger().log(`Server listening to ${appConfigService.host}:${appConfigService.port}`)
    })
}
bootstrap()
