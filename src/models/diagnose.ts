import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose'

@modelOptions({
  schemaOptions: {
    timestamps: true,
    versionKey: false,
    toObject: {
      virtuals: true,
      transform: (_doc, ret) => {
        ret.id = ret._id.toString()
        delete ret._id
      },
    },
    toJSON: {
      virtuals: true,
      transform: (_doc, ret) => {
        ret.id = ret._id.toString()
        delete ret._id
      },
    },
  },
})
export class Diagnose {
  @prop({ required: true, unique: true })
  public code!: string

  @prop({ required: true, unique: true })
  public name!: string

  @prop()
  public latin?: string
}

const DiagnoseModel = getModelForClass(Diagnose)

export default DiagnoseModel
