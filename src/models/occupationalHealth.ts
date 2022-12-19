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
class SickLeave {
  @prop({ required: true })
  public startDate!: Date

  @prop({ required: true })
  public endDate!: Date
}

export class OccupationalHealthcareEntry extends BaseEntry {
  @prop({ default: 'OccupationalHealthcare' })
  public type!: string

  @prop({ required: true, trim: true })
  public employerName!: string

  @prop() // subdocuments
  public sickLeave?: SickLeave
}

const OHCModel = getModelForClass(OccupationalHealthcareEntry)

export default OHCModel
