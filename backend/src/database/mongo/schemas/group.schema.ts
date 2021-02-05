import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose';
import { IGroup } from '../../../data/mongo/group.interface'
import { User } from './user.schema';

export type GroupDocument = Group & Document

@Schema()
export class Group implements IGroup {
    @Prop({ type: Types.ObjectId, ref: User.name })
    creator: User

    @Prop({ type: [{ type: Types.ObjectId, ref: User.name }] })
    admins: User[]

    @Prop()
    name: string

    @Prop()
    description: string

    @Prop()
    countryOfOrigin: string

    @Prop()
    address: string

    @Prop()
    country: string

    @Prop()
    lat: number

    @Prop()
    lng: number
}

export const GroupSchema = SchemaFactory.createForClass(Group)
