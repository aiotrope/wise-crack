import { Request, Response } from 'express'
import Joi from 'joi'
import { HydratedDocument } from 'mongoose'

import {
  HealthCheckModel,
  HealthCheck,
  EntryType,
  PatientModel,
  DiagnoseModel,
  HealthCheckRating,
} from '../models/index'
import logger from '../utils/logger'

const getAllHealthCheck = async (_req: Request, res: Response) => {
  const healthCheck: HealthCheck[] = await HealthCheckModel.find({})
  if (!healthCheck) throw Error('Problem fetching health check list!')
  return res.status(200).json(healthCheck)
}

const addHealthCheck = async (req: Request, res: Response) => {
  const id = req.params.id
  const patient = await PatientModel.findById(id)
  const schema = Joi.object().keys({
    description: Joi.string().required().trim(),
    specialist: Joi.string().required().trim(),
    type: Joi.string().default(EntryType.HealthCheckEntry),
    diagnose: Joi.string().required().trim(),
    date: Joi.date().required(),
    diagnosisCodes: Joi.array(),
    healthCheckRating: Joi.required()
      .valid(HealthCheckRating.Healthy)
      .valid(HealthCheckRating.LowRisk)
      .valid(HealthCheckRating.HighRisk)
      .valid(HealthCheckRating.CriticalRisk),
  })
  const response = schema.validate(req.body)
  if (response.error) {
    logger.error(response.error.details)
    throw Error(`${response.error.details[0].message}`)
  }
  if (!patient) throw Error(`Patient with ${id} is not in the record!`)

  const diagnose = await DiagnoseModel.findOne({
    _id: req.body.diagnose,
  })

  if (!diagnose) throw Error(`${req.body.diagnose} diagnose does not exist!`)

  try {
    const diagnoseObj = {
      id: diagnose._id,
      code: diagnose.code,
      name: diagnose.name,
      latin: diagnose.latin,
    }
    const data = {
      description: response.value.description,
      specialist: response.value.specialist,
      type: response.value.type,
      date: response.value.date,
      diagnose: response.value.diagnose,
      diagnosisCodes: diagnoseObj,
      healthCheckRating: response.value.healthCheckRating,
    }
    const healthCheck: HydratedDocument<HealthCheck> = new HealthCheckModel(
      data
    )

    patient.entries.unshift(healthCheck)
    await patient.save()
    await healthCheck.save()

    return res.status(201).json(healthCheck)
  } catch (error) {
    if (error instanceof Error) {
      throw Error(`${error.message}`)
    }
  }
}

export default {
  getAllHealthCheck,
  addHealthCheck,
}
