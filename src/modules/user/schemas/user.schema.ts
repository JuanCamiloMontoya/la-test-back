import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type UserDocument = User & Document

@Schema()
export class User {

  @Prop({ unique: true })
  email: string

  @Prop()
  password: string

  @Prop()
  firstname: string

  @Prop()
  lastname: string

  @Prop()
  phone: string

  @Prop({ default: false })
  active: boolean
}

export const UserSchema = SchemaFactory.createForClass(User)