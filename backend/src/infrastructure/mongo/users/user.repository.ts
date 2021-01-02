import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { IUser } from '../../../data/mongo/user.interface'
import { User, UserDocument } from '../../../database/mongo/schemas/user.schema'
import { createProjection } from '../../helpers/projection.helper'

@Injectable()
export class UserRepository {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async getIdentity(email: string): Promise<Pick<IUser, 'passwordHash'>> {
        const identity = await this.userModel.findOne({ email }, createProjection<IUser>('passwordHash')).orFail()
        return identity.toObject()
    }

    async create(user: IUser) {
        await this.userModel.create(user);
    }
}
