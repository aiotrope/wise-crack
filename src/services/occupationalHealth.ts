import { Request, Response } from 'express'
import Joi from 'joi'
import { HydratedDocument } from 'mongoose'

import {
  OHCModel,
  OccupationalHealthcare,
  PatientModel,
  EntryType,
  DiagnoseModel,
} from '../models/index'
import logger from '../utils/logger'

const getAllOCH = async (_req: Request, res: Response) => {
  const och: OccupationalHealthcare[] = await OHCModel.find({}).populate(
    'diagnosisCodes',
    { __v: 0 }
  )
  if (!och) throw Error('Problem fetching patients list!')
  return res.status(200).json(och)
}

const addOCH = async (req: Request, res: Response) => {
  const id = req.params.id
  const patient = await PatientModel.findById(id)
  const schema = Joi.object().keys({
    description: Joi.string().required().trim(),
    specialist: Joi.string().required().trim(),
    type: Joi.string().default(EntryType.OccupationalHealthcare),
    diagnose: Joi.string().required().trim(),
    date: Joi.date().required(),
    employerName: Joi.string().required().trim(),
    sickLeave: Joi.optional(),
    diagnosisCodes: Joi.array(),
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
      employerName: response.value.employerName,
      sickLeave: response.value.sickLeave,
    }

    const ohc: HydratedDocument<OccupationalHealthcare> = new OHCModel(data)

    patient.entries.unshift(ohc)
    await patient.save()

    await ohc.save()

    return res.status(201).json(ohc)
  } catch (error) {
    if (error instanceof Error) {
      throw Error(`${error.message}`)
    }
  }
}

export default {
  getAllOCH,
  addOCH,
}
