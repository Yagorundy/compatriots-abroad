import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { IGroup } from '../../../data/mongo/group.interface'
import { Group, GroupDocument } from '../../../database/mongo/schemas/group.schema'

@Injectable()
export class GroupRepository {
    constructor(@InjectModel(Group.name) private groupModel: Model<GroupDocument>) {}

    async create(group: IGroup) {
        await this.groupModel.create(group);
    }
}
