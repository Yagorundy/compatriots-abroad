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

    async createGroup(creatorId: string, group: Omit<IGroupSchema, 'id' | 'creatorId'>): Promise<IGroupSchema> {
        const doc = await this.create({
            creatorId,
            ...group
        })
        return this.docToObj(doc)
    }

    async getGroup(id: string): Promise<Pick<IGroupSchema, 'id' | 'creatorId' | 'name' | 'description' | 'countryOfOrigin' | 'address'>> {
        const doc = await this.get(id, '_id', 'creatorId', 'name', 'description', 'countryOfOrigin', 'address')
        return this.docToObj(doc)
    }

    async getGroupsForCreator(creatorId: string): Promise<Pick<IGroupSchema, 'id' | 'name'>[]> {
        const docs = await this.wrapQueryArray(this.model.find({ creatorId }, this.createProjection('_id', 'name')))
        return docs.map(this.docToObj)
    }

    async getGroupsShort(ids: string[]): Promise<Pick<IGroupSchema, 'id' | 'name'>[]> {
        const docs = await this.wrapQueryArray(this.model.find({ _id: { $in: ids } }, this.createProjection('_id', 'name')))
        return docs.map(this.docToObj)
    }

    async getGroupCreatorId(id: string) {
        const doc = await this.get(id, 'creatorId');
        return doc.creatorId
    }

    async getGroupsCoordinates(countryOfOriginCode: string): Promise<Pick<IGroupSchema, 'lat' | 'lng'>[]> {
        const docs = await this.wrapQueryArray(this.model.find({ countryOfOrigin: countryOfOriginCode }, this.createProjection('lat', 'lng')))
        return docs.map(this.docToObj)
    }

    async updateGroup(id: string, data: Omit<IGroupSchema, 'id' | 'creatorId'>) {
        const doc = await this.patch(id, data)
        return this.docToObj(doc)
    }

    async deleteGroup(id: string) {
        await this.delete(id)
    }
}
