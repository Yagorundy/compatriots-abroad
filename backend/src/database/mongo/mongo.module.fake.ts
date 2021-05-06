import { MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

const mongoDb = new MongoMemoryServer();

export const getMongoFakeModule = () => {
    return MongooseModule.forRootAsync({
        useFactory: async () => {
            const mongoUri = await mongoDb.getUri()
            return { uri: mongoUri }
        }
    })
}
