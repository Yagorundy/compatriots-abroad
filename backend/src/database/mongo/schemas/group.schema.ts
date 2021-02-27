import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose';
import { IGroupSchema } from '../../../data/mongo/group-schema.interface'
import { User } from './user.schema';

export type GroupDocument = Group & Document

@Schema()
export class Group implements Omit<IGroupSchema, 'id'> {
    @Prop({ type: Types.ObjectId, ref: User.name })
    creator: User | string

    @Prop({ type: [{ type: Types.ObjectId, ref: User.name }] })
    admins: (User | string)[]

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
