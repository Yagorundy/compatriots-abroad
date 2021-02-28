import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { NotFoundError } from '../../../../../common/errors/not-found.error'
import { IUserProfileDto } from '../../../../../common/transfer/users/user-profile-dto.interface'
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

    async createUser(user: Omit<IUserSchema, 'id' | 'likedGroups'>) {
        await this.create({ ...user, likedGroups: [] })
    }

    async getIdentity(email: string): Promise<Pick<IUserSchema, 'id' | 'passwordHash'>> {
        const doc = await this.wrapQuerySingle(this.model.findOne({ email }, this.createProjection('_id', 'passwordHash')))
        return this.docToObj(doc)
    }

    async getUserProfile(id: string): Promise<Pick<IUserSchema, 'id' | 'email' | 'firstName' | 'lastName' | 'countryOfOrigin' | 'address'>> {
        const doc = await this.get(id, '_id', 'email', 'firstName', 'lastName', 'countryOfOrigin', 'address')
        return this.docToObj(doc)
    }

    async updateUserProfile(id: string, userProfile: IUserProfileDto) {
        try {
            // TODO
        } catch (err) {
            throw new NotFoundError(`Could not update user profile with id ${id}!`, err)
        }
    }

    async getPublicUser(id: string): Promise<Pick<IUserSchema, 'id' | 'firstName' | 'lastName' | 'countryOfOrigin'>> {
        const doc = await this.get(id, '_id', 'firstName', 'lastName', 'countryOfOrigin')
        return this.docToObj(doc)
    }

    async getUserLocations(countryOfOriginCode: string): Promise<Pick<IUserSchema, 'lat' | 'lng'>[]> {
        const docs = await this.wrapQueryArray(this.model.find({ countryOfOrigin: countryOfOriginCode }, this.createProjection('lat', 'lng')))
        return docs.map(this.docToObj)
    }

    async getUserLikedGroups(id: string): Promise<string[]> {
        const doc = await this.get(id, 'likedGroups')
        return doc.likedGroups
    }
}
