import { DynamicModule, Module, Type } from "@nestjs/common";
import { NestFactory } from "@nestjs/core"
import { MongooseModule } from "@nestjs/mongoose";
import { Document, Model } from "mongoose";
import { MeilisearchClientModule } from "../database/meilisearch/meilisearch-client.module";
import { MeilisearchClientService } from "../database/meilisearch/meilisearch-client.service";
import { MongoModule } from "../database/mongo/mongo.module";

export const getService = async <T>(module: any, service: Type<T>): Promise<T> => {
    const context = await NestFactory.createApplicationContext(module, { logger: false })
    return context.get(service);
}

@Module({})
class MongoModelModule {}

export const getMongoModel = async<TDocument extends Document<any>>(name: string, schema: any): Promise<Model<TDocument>> => {
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

export const getMeilisearchClient = async () => await getService(MeilisearchClientModule, MeilisearchClientService)
