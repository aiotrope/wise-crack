import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'
import PatientModel, { Patient } from '../models/patient'
import { HydratedDocument } from 'mongoose'
import createHttpError from 'http-errors'
import logger from '../utils/logger'

const getAllPatients = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const patients: Patient[] = await PatientModel.find()
    return res.status(200).json(patients)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return next(createHttpError(500, `${error.message}`))
  }
}

const getNonConfidentialInfo = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    type NonConfidential = Omit<Patient, 'ssn'>
    const patients: NonConfidential[] = await PatientModel.find({}, { ssn: 0 })
    logger.warn(patients)
    return res.status(200).json(patients)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return next(createHttpError(500, `${error.message}`))
  }
}

const addPatient = async (req: Request, res: Response, next: NextFunction) => {
  const patientSchema = Joi.object().keys({
    name: Joi.string().required().trim().min(2).max(30),
    occupation: Joi.string().required().trim().min(2).max(30),
    ssn: Joi.string().required().trim().min(10).max(14),
    dateOfBirth: Joi.string().pattern(/^\d\d\d\d\-\d\d\-\d\d$/),
    gender: Joi.string()
      .required()
      .trim()
      .valid('male')
      .valid('female')
      .valid('other'),
  })
  const response = patientSchema.validate(req.body)
  if (response.error) {
    logger.error(response.error.details)
    return next(
      createHttpError(400, `Error: ${response.error.details[0].message}`)
    )
  }
  const patient: HydratedDocument<Patient> = new PatientModel(response.value)

  try {
    await patient.save()
    return res.status(201).json(patient)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    logger.warn(error.message)
    if (
      error.message ===
      `E11000 duplicate key error collection: wiseCrackDB.patients index: name_1 dup key: { name: \"${req.body.name}\" }`
    ) {
      return next(
        createHttpError(400, `${req.body.name} name is alredy taken!`)
      )
    } else {
      return next(createHttpError(400, `${error.message}`))
    }
  }
}

export default {
  getAllPatients,
  getNonConfidentialInfo,
  addPatient,
}
