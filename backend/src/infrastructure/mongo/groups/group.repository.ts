import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose';
import { AppError } from '../../../../../common/errors/app.error';
import { NotFoundError } from '../../../../../common/errors/not-found.error';
import { IGroupDto } from '../../../../../common/transfer/groups/group-dto.interface';
import { IGroupInfoDto } from '../../../../../common/transfer/groups/group-info-dto.interface';
import { ILocation } from '../../../../../common/transfer/locations/location.interface';
import { IGroup } from '../../../data/mongo/group.interface'
import { Group, GroupDocument } from '../../../database/mongo/schemas/group.schema'
import { createProjection } from '../../helpers/projection.helper';

@Injectable()
export class GroupRepository {
    constructor(@InjectModel(Group.name) private groupModel: Model<GroupDocument>) {}

    async create(creatorId: string, group: IGroup) {
        await this.groupModel.create({
            creator: creatorId,
            admins: [creatorId],
            ...group
        })
    }

    async getGroup(id: string): Promise<IGroupDto> {
        try {
            const data = await this.groupModel.findById(id, createProjection<IGroup>(false, 'name', 'description', 'countryOfOrigin', 'address')).orFail()
            return {
                name: data.name,
                description: data.description,
                countryOfOrigin: data.countryOfOrigin,
                address: data.address
            }
        } catch (err) {
            throw new NotFoundError(`Could not find group with id ${id}!`, err)
        }
    }

    async getGroupsForCreator(userId: string): Promise<IGroupInfoDto[]> {
        try {
            const groups = await this.groupModel.find({ creator: userId }, createProjection<IGroup>(true, 'name')).orFail()
            return groups.map(g => ({
                id: g.id!,
                name: g.name
            }))
        } catch (err) {
            if (err.name === 'DocumentNotFoundError') return []
            throw new AppError(`Error querying groups for creator ${userId}!`, err)
        }
    }

    async getGroupLocations(countryOfOriginCode: string) {
        try {
            return await this.groupModel.find({ countryOfOrigin: countryOfOriginCode }, createProjection<ILocation>(false, 'lat', 'lng')).orFail()
        } catch (err) {
            if (err.name === 'DocumentNotFoundError') return []
            throw new AppError(`Error querying group location for country of origin ${countryOfOriginCode}!`, err)
        }
    }
}
