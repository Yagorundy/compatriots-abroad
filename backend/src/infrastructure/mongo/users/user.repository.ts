import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { NotFoundError } from '../../../../../common/errors/not-found.error'
import { IUserPublic } from '../../../../../common/transfer/users/user-public.interface'
import { IUser } from '../../../data/mongo/user.interface'
import { User, UserDocument } from '../../../database/mongo/schemas/user.schema'
import { createProjection } from '../../helpers/projection.helper'
import { IUserIdentity } from './interfaces/user-identity.interface'

@Injectable()
export class UserRepository {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async check(id: string) {
        return await this.userModel.exists({ _id: id })
    }

    async getIdentity(email: string): Promise<IUserIdentity> {
        try {
            const data = await this.userModel.findOne({ email }, createProjection<IUser>('passwordHash')).orFail()
            return {
                id: data.id,
                passwordHash: data.passwordHash
            }
        } catch (err) {
            throw new NotFoundError(`Could not find user with email ${email}!`, err)
        }
    }

    async getPublicUser(id: string): Promise<IUserPublic> {
        try {
            const data = await this.userModel.findById(id, createProjection<IUser>('firstName', 'lastName')).orFail()
            return {
                firstName: data.firstName,
                lastName: data.lastName
            }
        } catch (err) {
            throw new NotFoundError(`Could not find user with id ${id}!`, err)
        }
    }

    async create(user: IUser) {
        await this.userModel.create(user);
    }
}
