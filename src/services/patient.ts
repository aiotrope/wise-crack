import { Request, Response } from 'express'
import Joi from 'joi'
import PatientModel, { Patient } from '../models/patient'
import { HydratedDocument } from 'mongoose'
import logger from '../utils/logger'

const getAllPatients = async (_req: Request, res: Response) => {
  const patients: Patient[] = await PatientModel.find()
  if (!patients) throw Error('Problem fetching patients list!')
  return res.status(200).json(patients)
}

const getPublicInfo = async (_req: Request, res: Response) => {
  type Public = Omit<Patient, 'ssn'>
  const patients: Public[] = await PatientModel.find({}, { ssn: 0 })
  if (!patients) throw Error('Problem fetching patients list')
  logger.warn(patients)
  return res.status(200).json(patients)
}

const getPatientById = async (req: Request, res: Response) => {
  const id = req.params.id
  const patient: Patient | null = await PatientModel.findById(id)
  if (!patient) throw Error('Patient with ${id} not found!')
  return res.status(200).json(patient)
}

const addPatient = async (req: Request, res: Response) => {
  const schema = Joi.object().keys({
    name: Joi.string().required().trim().min(2).max(30),
    occupation: Joi.string().required().trim().min(2).max(30),
    ssn: Joi.string().required().trim().min(10).max(14),
    dateOfBirth: Joi.date().required(),
    gender: Joi.string()
      .required()
      .trim()
      .valid('male')
      .valid('female')
      .valid('other'),
    entries: Joi.optional(),
  })
  const response = schema.validate(req.body)
  if (response.error) {
    logger.error(response.error.details)
    throw Error(`${response.error.details[0].message}`)
  }

  const patient: HydratedDocument<Patient> = new PatientModel(response.value)
  await patient.save()
  return res.status(201).json(patient)
}

export default {
  getAllPatients,
  getPublicInfo,
  getPatientById,
  addPatient,
}
