import { Request, Response } from 'express'
import Joi from 'joi'
import { HydratedDocument } from 'mongoose'

import { HospitalEntryModel, Hospital } from '../models/index'
import logger from '../utils/logger'

const getAllHopitalEntries = async (_req: Request, res: Response) => {
  const entry: Hospital[] = await HospitalEntryModel.find({})
  if (!entry) throw Error('Problem fetching hospital entry list!')
  return res.status(200).json(entry)
}

const addHospitalEntry = async (req: Request, res: Response) => {
  const schema = Joi.object().keys({
    description: Joi.string().required().trim(),
    specialist: Joi.string().required().trim(),
    diagnosisCodes: Joi.string().required().trim(),
    date: Joi.date().required(),
    discharge: Joi.required(),
  })
  const response = schema.validate(req.body)
  if (response.error) {
    logger.error(response.error.details)
    throw Error(`${response.error.details[0].message}`)
  }

  const hospitalEntry: HydratedDocument<Hospital> = new HospitalEntryModel(
    response.value
  )
  await hospitalEntry.save()
  return res.status(201).json(hospitalEntry)
}

export default {
  getAllHopitalEntries,
  addHospitalEntry,
}
