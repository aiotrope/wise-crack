import * as mongoose from 'mongoose'
import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose'
import { Base } from '@typegoose/typegoose/lib/defaultClasses'

export enum HealthCheckRating {
  Healthy = 0,
  LowRisk = 1,
  HighRisk = 2,
  CriticalRisk = 3,
}

enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export enum EntryType {
  OccupationalHealthcare = 'OccupationalHealthcare',
  Hospital = 'Hospital',
  HealthCheckEntry = 'HealthCheck',
}

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
class SickLeave {
  @prop({ required: true })
  public startDate!: Date

  @prop({ required: true })
  public endDate!: Date
}

export class Diagnose {
  @prop({ required: true, unique: true })
  public code!: string

  @prop({ required: true, unique: true })
  public name!: string

  @prop()
  public latin?: string
}

export class BaseEntry implements Base {
  _id!: mongoose.Types.ObjectId

  id!: string

  @prop({ required: true, trim: true, unique: true })
  public type!: string

  @prop({ required: true, trim: true })
  public description!: string

  @prop({ required: true, trim: true })
  public specialist!: string

  @prop({ required: true })
  public date!: Date

  @prop({ trim: true, required: true })
  public diagnose!: string

  @prop({ required: true, default: [] })
  public diagnosisCodes!: Diagnose[]
}

export class HealthCheck extends BaseEntry {
  @prop({ required: true, trim: true, default: EntryType.HealthCheckEntry })
  public type!: string

  @prop({
    required: true,
    enum: HealthCheckRating,
    default: HealthCheckRating.Healthy,
  })
  public healthCheckRating!: HealthCheckRating
}

class Discharge {
  @prop({ required: true })
  public date!: Date

  @prop({ required: true })
  public criteria!: string
}

export class Hospital extends BaseEntry {
  @prop({
    trim: true,
    default: EntryType.Hospital,
  })
  public type!: string

  @prop({ required: true })
  public discharge!: Discharge
}

export class OccupationalHealthcare extends BaseEntry {
  @prop({
    trim: true,
    default: EntryType.OccupationalHealthcare,
  })
  public type!: string

  @prop({ required: true, trim: true })
  public employerName!: string

  @prop()
  public sickLeave?: SickLeave
}

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

  @prop({ type: mongoose.Schema.Types.Mixed, required: true, default: [] })
  public entries!: mongoose.Types.Array<mongoose.Mixed>
}

export const DiagnoseModel = getModelForClass(Diagnose, {
  schemaOptions: {
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
export const HealthCheckModel = getModelForClass(HealthCheck, {
  schemaOptions: {
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
export const HospitalEntryModel = getModelForClass(Hospital, {
  schemaOptions: {
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
export const OHCModel = getModelForClass(OccupationalHealthcare, {
  schemaOptions: {
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
export const PatientModel = getModelForClass(Patient, {
  schemaOptions: {
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
