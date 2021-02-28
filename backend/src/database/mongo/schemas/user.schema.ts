import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { IUserSchema } from '../../../data/mongo/user-schema.interface'

export type UserDocument = User & Document

@Schema()
export class User implements Omit<IUserSchema, 'id'> {
    @Prop()
    firstName: string

    @Prop()
    lastName: string

    @Prop()
    email: string

    @Prop()
    passwordHash: string

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

    @Prop({ type: [{ type: Types.ObjectId, ref: User.name }] })
    likedGroups: string[]
}

export const UserSchema = SchemaFactory.createForClass(User)
