import * as mongoose from 'mongoose'
import { prop, getModelForClass, modelOptions, Ref } from '@typegoose/typegoose'
import { Base } from '@typegoose/typegoose/lib/defaultClasses'
import { Diagnose } from './diagnose'

@modelOptions({
  schemaOptions: {
    timestamps: true,
    versionKey: false,

    toJSON: {
      virtuals: true,
      transform: (_doc, ret) => {
        ret.id = ret._id.toString()
        delete ret._id
      },
    },
  },
})
export class BaseEntry implements Base {
  _id!: mongoose.Types.ObjectId

  id!: string

  @prop({ required: true, trim: true, unique: true })
  public type!: string

  @prop({ required: true, trim: true })
  public description!: string

  @prop({ required: true, trim: true })
  public specialist!: string

  @prop({ required: true })
  public date!: Date

  @prop({ required: true, trim: true, ref: () => Diagnose })
  public diagnosisCodes!: Ref<Diagnose>[] // references
}

const BaseEntryModel = getModelForClass(BaseEntry)

export default BaseEntryModel
