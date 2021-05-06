import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { MongoConfigModule } from '../../config/mongo/mongo-config.module'
import { MongoConfigService } from '../../config/mongo/mongo-config.service'
import { isTestEnv } from '../../helpers/env.helper'
import { getMongoFakeModule } from './mongo.module.fake'

@Module({
    imports: [
        isTestEnv()
            ? getMongoFakeModule()
            : MongooseModule.forRootAsync({
                imports: [MongoConfigModule],
                useClass: MongoConfigService
            })
    ],
    exports: [MongooseModule]
})
export class MongoModule {}
