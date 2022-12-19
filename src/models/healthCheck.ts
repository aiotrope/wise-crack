import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose'
import { BaseEntry } from './base'

export enum HealthCheckRating {
  'Healthy' = 0,
  'LowRisk' = 1,
  'HighRisk' = 2,
  'CriticalRisk' = 3,
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
export class HealthCheckEntry extends BaseEntry {
  @prop({ default: 'HealthCheck' })
  public type!: string

  @prop({
    required: true,
    enum: HealthCheckRating,
    default: HealthCheckRating.Healthy,
  })
  public healthCheckRating!: HealthCheckRating
}

const HealthCheckModel = getModelForClass(HealthCheckEntry)

export default HealthCheckModel
