/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Schema, model, Document } from 'mongoose'

type IDiagnosis = {
  code: string
  name: string
  latin?: string
} & Document

const DiagnosisSchema = new Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  name: {
    type: String,
    trim: true,
  },
  latin: {
    type: String,
    required: true,
    trim: true,
  },
})

DiagnosisSchema.virtual('id').get(function () {
  return this._id.toHexString()
})
DiagnosisSchema.set('toJSON', {
  virtuals: true,
  transform: (_document, retObj) => {
    delete retObj.__v
  },
})

const Diagnosis = model<IDiagnosis>('Diagnosis', DiagnosisSchema)

export default Diagnosis
