import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose';
import { IGroupSchema } from '../../../data/mongo/group-schema.interface'
import { Group, GroupDocument } from '../../../database/mongo/schemas/group.schema'
import { MongoRepository } from '../repository.base';

@Injectable()
export class GroupRepository extends MongoRepository<GroupDocument> {
    constructor(@InjectModel(Group.name) model: Model<GroupDocument>) {
        super(model)
    }

    async createGroup(creatorId: string, group: Omit<IGroupSchema, 'id'>): Promise<IGroupSchema> {
        const doc = await this.create({
            creator: creatorId,
            admins: [creatorId],
            ...group
        })
        return this.docToObj(doc)
    }

    async getGroup(id: string): Promise<Pick<IGroupSchema, 'id' | 'name' | 'description' | 'countryOfOrigin' | 'address'>> {
        const doc = await this.get(id, '_id', 'name', 'description', 'countryOfOrigin', 'address')
        return this.docToObj(doc)
    }

    async getGroupsForCreator(userId: string): Promise<Pick<IGroupSchema, 'id' | 'name'>[]> {
        const docs = await this.wrapQueryArray(this.model.find({ creator: userId }, this.createProjection('_id', 'name')))
        return docs.map(this.docToObj)
    }

    async getGroupLocations(countryOfOriginCode: string): Promise<Pick<IGroupSchema, 'lat' | 'lng'>[]> {
        const docs = await this.wrapQueryArray(this.model.find({ countryOfOrigin: countryOfOriginCode }, this.createProjection('lat', 'lng')))
        return docs.map(this.docToObj)
    }
}
