/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable no-useless-escape */
import { Schema, model, Document } from 'mongoose'

type IPatient = {
  name: string
  occupation: string
  ssn: string
  dateOfBirth: string
  gender: string
} & Document

const PatientSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  occupation: {
    type: String,
    required: true,
    trim: true,
  },
  ssn: {
    type: String,
    required: true,
    trim: true,
  },
  dateOfBirth: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: (val: string) => /^\d\d\d\d\-\d\d\-\d\d$/gm.test(val),
      message: (props: { value: string }) =>
        `${props.value} is not valid date of birth!`,
    },
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true,
  },
})

PatientSchema.virtual('id').get(function () {
  return this._id.toHexString()
})
PatientSchema.set('toJSON', {
  virtuals: true,
  transform: (_document, retObj) => {
    delete retObj.__v
  },
})

const Patient = model<IPatient>('Patient', PatientSchema)

export default Patient
