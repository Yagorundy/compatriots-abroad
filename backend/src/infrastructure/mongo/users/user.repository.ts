import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { AppError } from '../../../../../common/errors/app.error'
import { NotFoundError } from '../../../../../common/errors/not-found.error'
import { ILocationDto } from '../../../../../common/transfer/locations/location-dto.interface'
import { IUserDto } from '../../../../../common/transfer/users/user-dto.interface'
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

    async create(user: IUser) {
        await this.userModel.create(user);
    }

    async getIdentity(email: string): Promise<IUserIdentity> {
        try {
            const data = await this.userModel.findOne({ email }, createProjection<IUser>(true, 'passwordHash')).orFail()
            return {
                id: data.id,
                passwordHash: data.passwordHash
            }
        } catch (err) {
            throw new NotFoundError(`Could not find user with email ${email}!`, err)
        }
    }

    async getUserProfile(id: string): Promise<IUserDto> {
        try {
            const data = await this.userModel.findById(id, createProjection<IUserDto>(false, 'email', 'firstName', 'lastName', 'countryOfOrigin', 'address')).orFail()
            return {
                id,
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
                countryOfOrigin: data.countryOfOrigin,
                address: data.address
            }
        } catch (err) {
            throw new NotFoundError(`Could not find user profile with id ${id}!`, err)
        }
    }

    async updateUserProfile(id: string, userProfile: IUserDto) {
        try {
            // TODO
        } catch (err) {
            throw new NotFoundError(`Could not update user profile with id ${id}!`, err)
        }
    }

    async getPublicUser(id: string): Promise<IUserPublic> {
        try {
            const data = await this.userModel.findById(id, createProjection<IUser>(false, 'firstName', 'lastName', 'countryOfOrigin')).orFail()
            return {
                id,
                firstName: data.firstName,
                lastName: data.lastName,
                countryOfOrigin: data.countryOfOrigin
            }
        } catch (err) {
            throw new NotFoundError(`Could not find user with id ${id}!`, err)
        }
    }

    async getUserLocations(countryOfOriginCode: string): Promise<ILocationDto[]> {
        try {
            return await this.userModel.find({ countryOfOrigin: countryOfOriginCode }, createProjection<ILocationDto>(false, 'lat', 'lng')).orFail()
        } catch (err) {
            if (err.name === 'DocumentNotFoundError') return []
            throw new AppError(`Error querying user location for country of origin ${countryOfOriginCode}!`, err)
        }
    }
}
