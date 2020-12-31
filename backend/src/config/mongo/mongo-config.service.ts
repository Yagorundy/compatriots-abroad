import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { MongooseModuleOptions, MongooseOptionsFactory } from '@nestjs/mongoose'

@Injectable()
export class MongoConfigService implements MongooseOptionsFactory {
    constructor(private configService: ConfigService) {}

    get user() {
        return this.configService.get<string>('MONGO_USER')
    }

    get pass() {
        return this.configService.get<string>('MONGO_PASS')
    }

    get dbName() {
        return this.configService.get<string>('MONGO_DB_NAME')
    }

    get uri() {
        return this.configService.get<string>('MONGO_URI')
    }

    createMongooseOptions(): MongooseModuleOptions {
        return {
            useNewUrlParser: true,
            uri: this.uri,
            user: this.user,
            pass: this.pass,
            dbName: this.dbName
        }
    }
}
