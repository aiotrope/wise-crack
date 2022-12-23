import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose'

enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

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
export class Patient {
  @prop({ required: true, unique: true, trim: true })
  public name!: string

  @prop({ required: true, unique: true, trim: true })
  public ssn!: string

  @prop({ required: true, trim: true })
  public occupation!: string

  @prop({ required: true })
  public dateOfBirth!: Date

  @prop({
    required: true,
    enum: Gender,
  })
  public gender!: Gender

  @prop()
  public entries?: []
}

const PatientModel = getModelForClass(Patient)

export default PatientModel
