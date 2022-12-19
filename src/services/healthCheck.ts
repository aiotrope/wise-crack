import { Request, Response } from 'express'
import Joi from 'joi'
import HealthCheckModel, { HealthCheckEntry } from '../models/healthCheck'
import { HydratedDocument } from 'mongoose'
import logger from '../utils/logger'

const getAllHealthCheck = async (_req: Request, res: Response) => {
  const healthCheck: HealthCheckEntry[] = await HealthCheckModel.find({})
  if (!healthCheck) throw Error('Problem fetching health check list!')
  return res.status(200).json(healthCheck)
}

const addHealthCheck = async (req: Request, res: Response) => {
  const schema = Joi.object().keys({
    description: Joi.string().required().trim(),
    specialist: Joi.string().required().trim(),
    diagnosisCodes: Joi.string().required().trim(),
    date: Joi.date().required(),
    healthCheckRating: Joi.number()
      .required()
      .integer()
      .valid(0)
      .valid(1)
      .valid(2)
      .valid(3),
  })
  const response = schema.validate(req.body)
  if (response.error) {
    logger.error(response.error.details)
    throw Error(`${response.error.details[0].message}`)
  }

  const healthCheck: HydratedDocument<HealthCheckEntry> = new HealthCheckModel(
    response.value
  )
  await healthCheck.save()
  return res.status(201).json(healthCheck)
}

export default {
  getAllHealthCheck,
  addHealthCheck,
}
