import {
  prop,
  getModelForClass,
  modelOptions,
  mongoose,
} from '@typegoose/typegoose'
import { Base } from '@typegoose/typegoose/lib/defaultClasses'

@modelOptions({
  schemaOptions: {
    toJSON: {
      virtuals: true,
      transform: (_document, retObj) => {
        delete retObj.__v
      },
    },
  },
})
export class Diagnose implements Base {
  _id!: mongoose.Types.ObjectId

  id!: string

  @prop({ required: true, unique: true })
  public code!: string
  @prop({ required: true, unique: true })
  public name!: string
  @prop()
  public latin?: string
}

const DiagnoseModel = getModelForClass(Diagnose)

export default DiagnoseModel
