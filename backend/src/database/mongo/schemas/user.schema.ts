import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { IUser } from '../../../data/mongo/user.interface'

export type UserDocument = User & Document

@Schema()
export class User implements IUser {
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
    country: string

    @Prop()
    address: string

    @Prop()
    lat: number

    @Prop()
    lng: number
}

export const UserSchema = SchemaFactory.createForClass(User)
