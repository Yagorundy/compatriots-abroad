import { Test } from '@nestjs/testing'
import { MongooseModule } from "@nestjs/mongoose"
import { Document, Model, Schema } from "mongoose"
import { getMongoFakeModule } from "../../database/mongo/mongo.module.fake"
import { MongoRepository } from "./repository.base"

export const getMongoFakeRepo = async <TDoc extends Document, TRepo extends MongoRepository<TDoc>>(repoCtor: new (model: Model<TDoc>) => TRepo, schema: Schema, name: string) : Promise<TRepo> => {
    const module = await Test.createTestingModule({
        imports: [
            getMongoFakeModule(),
            MongooseModule.forFeature([{ name, schema }]),
        ],
        providers: [repoCtor],
    }).compile()
    return module.get(repoCtor)
}
