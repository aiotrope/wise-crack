import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose'
import { BaseEntry } from './base'

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
class Discharge {
  @prop({ required: true })
  public date!: Date

  @prop({ required: true })
  public criteria!: string
}

export class HospitalEntry extends BaseEntry {
  @prop({ default: 'Hospital' })
  public type!: string

  @prop({ required: true }) // subdocuments
  public discharge!: Discharge
}

const HospitalEntryModel = getModelForClass(HospitalEntry)

export default HospitalEntryModel
