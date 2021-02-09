import { Module } from '@nestjs/common'
import { AuthApiModule } from './api/auth/auth-api.module'
import { GroupsApiModule } from './api/groups/groups-api.module'
import { LocationsApiModule } from './api/locations/locations-api.module'
import { MeilisearchApiModule } from './api/meilisearch/meilisearch-api.module'
import { UsersApiModule } from './api/users/users-api.module'
import { AppConfigModule } from './config/app/app-config.module'
import { MongoModule } from './database/mongo/mongo.module'

@Module({
    imports: [
        // App config
        AppConfigModule,
        // Db providers
        MongoModule,
        // Controllers
        AuthApiModule,
        UsersApiModule,
        GroupsApiModule,
        LocationsApiModule,
        MeilisearchApiModule
    ]
})
export class AppModule {}
