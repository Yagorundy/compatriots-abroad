import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose';
import { AppError } from '../../../../../common/errors/app.error';
import { ILocation } from '../../../../../common/transfer/locations/location.interface';
import { IGroup } from '../../../data/mongo/group.interface'
import { Group, GroupDocument } from '../../../database/mongo/schemas/group.schema'
import { createProjection } from '../../helpers/projection.helper';

@Injectable()
export class GroupRepository {
    constructor(@InjectModel(Group.name) private groupModel: Model<GroupDocument>) {}

    async getGroupLocations(countryOfOriginCode: string) {
        try {
            return await this.groupModel.find({ countryOfOrigin: countryOfOriginCode }, createProjection<ILocation>(false, 'lat', 'lng')).orFail()
        } catch (err) {
            if (err.name === 'DocumentNotFoundError') return []
            throw new AppError(`Error querying group location for country of origin ${countryOfOriginCode}!`, err)
        }
    }

    async create(creatorId: string, group: IGroup) {
        await this.groupModel.create({
            // @ts-ignore
            creator: creatorId,
            admins: [creatorId],
            ...group
        })
    }
}
