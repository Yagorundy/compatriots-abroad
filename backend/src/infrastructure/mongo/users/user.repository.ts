import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { NotFoundError } from '../../../../../common/errors/not-found.error'
import { IUser } from '../../../data/mongo/user.interface'
import { User, UserDocument } from '../../../database/mongo/schemas/user.schema'
import { createProjection } from '../../helpers/projection.helper'
import { IUserIdentity } from './interfaces/user-identity.interface'

@Injectable()
export class UserRepository {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async check(id: string) {
        return await this.userModel.exists({ id });
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

    async create(user: IUser) {
        await this.userModel.create(user);
    }
}
