import { Schema, model } from 'mongoose'

export interface Diagnose {
  code: string
  name: string
  latin?: string
}

const DiagnoseSchema = new Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  name: {
    type: String,
    trim: true,
    unique: true,
  },
  latin: {
    type: String,
  },
})

DiagnoseSchema.virtual('id').get(function () {
  return this._id.toHexString()
})
DiagnoseSchema.set('toJSON', {
  virtuals: true,
  transform: (_document, retObj) => {
    delete retObj.__v
  },
})

const DiagnoseModel = model<Diagnose>('DiagnoseModel', DiagnoseSchema)

export default DiagnoseModel
