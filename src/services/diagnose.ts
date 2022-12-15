import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'
import DiagnoseModel, { Diagnose } from '../models/diagnose'
//import { HydratedDocument } from 'mongoose'
import createHttpError from 'http-errors'
import logger from '../utils/logger'

const getAllDiagnoses = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const diagnoses: Diagnose[] = await DiagnoseModel.find({})
    return res.status(200).json(diagnoses)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    next(createHttpError(500, `${error.message}`))
  }
}

const addDiagnose = async (req: Request, res: Response, next: NextFunction) => {
  const DiagnoseSchema = Joi.object().keys({
    code: Joi.string().required().trim().min(4).max(5),
    name: Joi.string().required().trim().min(5).max(100),
    latin: Joi.string().optional().allow(''),
  })
  const response = DiagnoseSchema.validate(req.body)
  if (response.error) {
    logger.error(response.error.details)
    return next(
      createHttpError(400, `Error: ${response.error.details[0].message}`)
    )
  }

  try {
    const diagnose: Diagnose = await DiagnoseModel.create(response.value)
    return res.status(201).json(diagnose)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    logger.warn(error.message)
    if (
      error.message ===
      `E11000 duplicate key error collection: wiseCrackDB.diagnoses index: name_1 dup key: { name: \"${req.body.name}\" }`
    ) {
      return next(
        createHttpError(400, `${req.body.name} name is alredy taken!`)
      )
    }
    if (
      error.message ===
      `E11000 duplicate key error collection: wiseCrackDB.diagnoses index: code_1 dup key: { code: \"${req.body.code}\" }`
    ) {
      return next(
        createHttpError(400, `${req.body.code} code is alredy taken!`)
      )
    }
    return next(createHttpError(400, `${error.message}`))
  }
}

export default {
  getAllDiagnoses,
  addDiagnose,
}
