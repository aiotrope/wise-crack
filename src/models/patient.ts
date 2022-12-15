import { Schema, model } from 'mongoose'

export interface Patient {
  name: string
  occupation: string
  ssn: string
  dateOfBirth: string
  gender: string
}

const PatientSchema = new Schema<Patient>({
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
    unique: true,
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

const PatientModel = model<Patient>('PatientModel', PatientSchema)

export default PatientModel
