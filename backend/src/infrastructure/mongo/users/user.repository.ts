import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { IUserSchema } from '../../../data/mongo/user-schema.interface'
import { User, UserDocument } from '../../../database/mongo/schemas/user.schema'
import { MongoRepository } from '../repository.base'

@Injectable()
export class UserRepository extends MongoRepository<UserDocument> {
    constructor(@InjectModel(User.name) model: Model<UserDocument>) {
        super(model)
    }

    async userExists(id: string) {
        return await this.exists(id)
    }

    async createUser(user: Omit<Partial<IUserSchema>, 'id' | 'likedGroups'>) {
        await this.create({ ...user, likedGroups: [] })
    }

    async getIdentity(email: string): Promise<Pick<IUserSchema, 'id' | 'passwordHash'>> {
        const doc = await this.wrapQuerySingle(this.model.findOne({ email }, this.createProjection('_id', 'passwordHash')))
        return this.docToObj(doc)
    }

    async getUserProfile(id: string): Promise<Pick<IUserSchema, 'email' | 'firstName' | 'lastName' | 'countryOfOrigin' | 'address'>> {
        const doc = await this.get(id, 'email', 'firstName', 'lastName', 'countryOfOrigin', 'address')
        return this.docToObj(doc)
    }

    async updateUser(id: string, data: Partial<Omit<IUserSchema, 'id'>>) {
        const doc = await this.patch(id, data)
        return this.docToObj(doc)
    }

    async getPublicUser(id: string): Promise<Pick<IUserSchema, 'id' | 'firstName' | 'lastName' | 'countryOfOrigin'>> {
        const doc = await this.get(id, '_id', 'firstName', 'lastName', 'countryOfOrigin')
        return this.docToObj(doc)
    }

    async getUsersCoordinates(countryOfOriginCode: string): Promise<Pick<IUserSchema, 'lat' | 'lng'>[]> {
        const docs = await this.wrapQueryArray(this.model.find({ countryOfOrigin: countryOfOriginCode }, this.createProjection('lat', 'lng')))
        return docs.map(this.docToObj)
    }

    async getUserLikedGroups(id: string): Promise<string[]> {
        const doc = await this.get(id, 'likedGroups')
        return doc.likedGroups
    }
}
