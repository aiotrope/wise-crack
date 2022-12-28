import { Request, Response } from 'express'
import Joi from 'joi'
import { HydratedDocument } from 'mongoose'

import {
  HospitalEntryModel,
  Hospital,
  EntryType,
  PatientModel,
  DiagnoseModel,
} from '../models/index'
import logger from '../utils/logger'

const getAllHopitalEntries = async (_req: Request, res: Response) => {
  const entry: Hospital[] = await HospitalEntryModel.find({})
  if (!entry) throw Error('Problem fetching hospital entry list!')
  return res.status(200).json(entry)
}

const addHospitalEntry = async (req: Request, res: Response) => {
  const id = req.params.id
  const patient = await PatientModel.findById(id)
  const schema = Joi.object().keys({
    description: Joi.string().required().trim(),
    specialist: Joi.string().required().trim(),
    type: Joi.string().default(EntryType.Hospital),
    diagnose: Joi.string().required().trim(),
    date: Joi.date().required(),
    diagnosisCodes: Joi.array(),
    discharge: Joi.optional(),
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
      discharge: response.value.discharge,
    }
    const hospitalEntry: HydratedDocument<Hospital> = new HospitalEntryModel(
      data
    )

    patient.entries.unshift(hospitalEntry)
    await patient.save()

    await hospitalEntry.save()

    return res.status(201).json(hospitalEntry)
  } catch (error) {
    if (error instanceof Error) {
      throw Error(`${error.message}`)
    }
  }
}

export default {
  getAllHopitalEntries,
  addHospitalEntry,
}
