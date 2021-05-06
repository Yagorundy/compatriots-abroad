import { Test } from "@nestjs/testing"
import { AppModule } from "./app.module"
import { JwtConfigService } from "./config/jwt/jwt-config.service"
import { JwtConfigServiceFake } from "./config/jwt/jwt-config.service.fake"
import { configureAppValidation } from "./configure-app-validation"
import { MeilisearchClientService } from "./database/meilisearch/meilisearch-client.service"
import { GeocodingService } from "./infrastructure/geocoding/geocoding.service"
import { GeocodingServiceFake } from "./infrastructure/geocoding/geocoding.service.fake"
import { MeilisearchService } from "./infrastructure/meilisearch/meilisearch.service"
import { MeilisearchServiceFake } from "./infrastructure/meilisearch/meilisearch.service.fake"

export const getAppFake = async () => {
    const module = await Test.createTestingModule({
        imports: [AppModule]
    })
        // TODO: improve
        .overrideProvider(MeilisearchClientService)
        .useValue({})
        .overrideProvider(MeilisearchService)
        .useValue(new MeilisearchServiceFake())

        .overrideProvider(GeocodingService)
        .useValue(new GeocodingServiceFake())

        .overrideProvider(JwtConfigService)
        .useValue(new JwtConfigServiceFake())

        .compile()

    const app = module.createNestApplication();
    configureAppValidation(app);

    return app;
}
