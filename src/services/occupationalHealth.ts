import { Request, Response } from 'express'
import Joi from 'joi'
import { HydratedDocument } from 'mongoose'

import {
  OHCModel,
  OccupationalHealthcare,
  PatientModel,
  Patient,
  EntryType,
  DiagnoseModel,
  Diagnose,
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
  const patient: Patient | null = await PatientModel.findById(id)
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

  try {
    const formData = response.value
    const diagnoseObj: Diagnose | null = await DiagnoseModel.findOne({
      _id: req.body.diagnose,
    })
    console.log('Form', formData)
    console.log('code', formData.diagnose)

    const och: HydratedDocument<OccupationalHealthcare> = new OHCModel(
      response.value
    )
    const savedOch = await och.save()

    if (diagnoseObj) {
      const codeObj = {
        code: diagnoseObj.code,
        name: diagnoseObj.name,
        latin: diagnoseObj.latin,
      }
      await OHCModel.updateOne(
        { _id: savedOch._id },
        {
          $push: {
            diagnosisCodes: { $each: [codeObj], $position: 0 },
          },
        }
      )
    }

    await PatientModel.updateOne(
      { _id: id },
      {
        entryType: EntryType.OccupationalHealthcare,
        $push: { entries: { $each: [savedOch._id], $position: 0 } },
      }
    )

    return res.status(201).json(savedOch)
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
