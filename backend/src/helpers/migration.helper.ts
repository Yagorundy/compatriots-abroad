import { DynamicModule, Module, Type } from "@nestjs/common";
import { NestFactory } from "@nestjs/core"
import { MongooseModule } from "@nestjs/mongoose";
import { Document, Model } from "mongoose";
import { MeilisearchClientModule } from "../database/meilisearch/meilisearch-client.module";
import { MeilisearchClientService } from "../database/meilisearch/meilisearch-client.service";
import { Migration, MigrationDocument, MigrationSchema } from "../database/migration-store/schemas/migration.schema";
import { MongoModule } from "../database/mongo/mongo.module";
import { Group, GroupDocument, GroupSchema } from "../database/mongo/schemas/group.schema";
import { User, UserDocument, UserSchema } from "../database/mongo/schemas/user.schema";

const getService = async <T>(module: any, service: Type<T>): Promise<T> => {
    const context = await NestFactory.createApplicationContext(module, { logger: false })
    return context.get(service);
}

export const getMeilisearchClient = async () => await getService(MeilisearchClientModule, MeilisearchClientService)

@Module({})
class MongoModelModule {}

const getMongoModel = async<TDocument extends Document<any>>(name: string, schema: any): Promise<Model<TDocument>> => {
    const module: DynamicModule = {
        module: MongoModelModule,
        imports: [
            MongoModule,
            MongooseModule.forFeature([{ name, schema }])
        ]
    }
    const context = await NestFactory.createApplicationContext(module, { logger: false })
    return context.get(`${name}Model`)
}

export const getMongoMigrationModel = async () => await getMongoModel<MigrationDocument>(Migration.name, MigrationSchema);
export const getMongoUserModel = async () => await getMongoModel<UserDocument>(User.name, UserSchema);
export const getMongoGroupModel = async () => await getMongoModel<GroupDocument>(Group.name, GroupSchema);
