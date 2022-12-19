import { Request, Response } from 'express'
import Joi from 'joi'
import OHCModel, {
  OccupationalHealthcareEntry,
} from '../models/occupationalHealth'
import { HydratedDocument } from 'mongoose'
import logger from '../utils/logger'

const getAllOCH = async (_req: Request, res: Response) => {
  const och: OccupationalHealthcareEntry[] = await OHCModel.find({}).populate(
    'diagnosisCodes',
    { __v: 0 }
  )
  if (!och) throw Error('Problem fetching patients list!')
  return res.status(200).json(och)
}

const addOCH = async (req: Request, res: Response) => {
  const schema = Joi.object().keys({
    description: Joi.string().required().trim(),
    specialist: Joi.string().required().trim(),
    diagnosisCodes: Joi.string().required().trim(),
    date: Joi.date().required(),
    employerName: Joi.string().required().trim(),
    sickLeave: Joi.optional().allow(''),
  })
  const response = schema.validate(req.body)
  if (response.error) {
    logger.error(response.error.details)
    throw Error(`${response.error.details[0].message}`)
  }

  const och: HydratedDocument<OccupationalHealthcareEntry> = new OHCModel(
    response.value
  )
  await och.save()
  return res.status(201).json(och)
}

export default {
  getAllOCH,
  addOCH,
}
