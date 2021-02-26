import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { IUser } from '../../../data/mongo/user.interface'

export type UserDocument = User & Document<string>

@Schema()
export class User implements Omit<IUser, 'id'> {
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
}

export const UserSchema = SchemaFactory.createForClass(User)
