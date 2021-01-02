import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { IUser } from '../../../data/mongo/user.interface'
import { User, UserDocument } from '../../../database/mongo/schemas/user.schema'

@Injectable()
export class UserRepository {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async create(user: IUser) {
        await this.userModel.create(user);
    }
}
