import { Request, Response } from 'express'
import Joi from 'joi'
import DiagnoseModel, { Diagnose } from '../models/diagnose'
import logger from '../utils/logger'

const getAllDiagnoses = async (_req: Request, res: Response) => {
  const diagnoses: Diagnose[] = await DiagnoseModel.find({})
  if (!diagnoses) throw Error('Problem fetching diagnose list!')
  return res.status(200).json(diagnoses)
}

const addDiagnose = async (req: Request, res: Response) => {
  const schema = Joi.object().keys({
    code: Joi.string().required().trim().min(4).max(5),
    name: Joi.string().required().trim().min(5).max(100),
    latin: Joi.string().optional().allow(''),
  })
  const response = schema.validate(req.body)
  if (response.error) {
    logger.error(response.error.details)
    throw Error(`${response.error.details[0].message}`)
  }
  const diagnose: Diagnose = await DiagnoseModel.create(response.value)
  return res.status(201).json(diagnose)
}

export default {
  getAllDiagnoses,
  addDiagnose,
}
