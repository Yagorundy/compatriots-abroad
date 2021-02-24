import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { MongoModule } from '../mongo/mongo.module'
import { MigrationStoreService } from './migration-store.service'
import { Migration, MigrationSchema } from './schemas/migration.schema'

@Module({
    providers: [MigrationStoreService],
    imports: [
        MongoModule,
        MongooseModule.forFeature([{ name: Migration.name, schema: MigrationSchema }])
    ],
    exports: [MigrationStoreService]
})
export class MigrationStoreModule {}
