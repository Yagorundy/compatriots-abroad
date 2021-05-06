import { Test } from "@nestjs/testing"
import { AppModule } from "./app.module"
import { configureAppValidation } from "./configure-app-validation"
import { GeocodingService } from "./infrastructure/geocoding/geocoding.service"
import { GeocodingServiceFake } from "./infrastructure/geocoding/geocoding.service.fake"
import { MeilisearchService } from "./infrastructure/meilisearch/meilisearch.service"
import { MeilisearchServiceFake } from "./infrastructure/meilisearch/meilisearch.service.fake"
import { GroupRepository } from "./infrastructure/mongo/groups/group.repository"
import { getMongoFakeGroupRepo } from "./infrastructure/mongo/groups/group.repository.fake"
import { UserRepository } from "./infrastructure/mongo/users/user.repository"
import { getMongoFakeUserRepo } from "./infrastructure/mongo/users/user.repository.fake"

export const getAppFake = async () => {
    const module = await Test.createTestingModule({
        imports: [AppModule]
    })
        .overrideProvider(UserRepository)
        .useValue(await getMongoFakeUserRepo())
        .overrideProvider(GroupRepository)
        .useValue(await getMongoFakeGroupRepo())
        .overrideProvider(GeocodingService)
        .useValue(new GeocodingServiceFake())
        .overrideProvider(MeilisearchService)
        .useValue(new MeilisearchServiceFake())
        .compile()

    const app = module.createNestApplication();
    configureAppValidation(app);

    return app;
}
