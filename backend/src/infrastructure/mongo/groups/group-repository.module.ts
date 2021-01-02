import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Group, GroupSchema } from '../../../database/mongo/schemas/group.schema'
import { GroupRepository } from './group.repository'

@Module({
    providers: [GroupRepository],
    imports: [
        MongooseModule.forFeature([{ name: Group.name, schema: GroupSchema }])
    ],
    exports: [GroupRepository]
})
export class GroupRepositoryModule {}
