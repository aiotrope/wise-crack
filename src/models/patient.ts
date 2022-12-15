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
export class Patient implements Base {
  _id!: mongoose.Types.ObjectId

  id!: string

  @prop({ required: true, unique: true, trim: true })
  public name!: string

  @prop({ required: true, trim: true })
  public occupation!: string

  @prop({ required: true, trim: true })
  public dateOfBirth!: string

  @prop({
    required: true,
    enum: ['male', 'female', 'other'],
    trim: true,
  })
  public gender!: string
}

const PatientModel = getModelForClass(Patient)

export default PatientModel
