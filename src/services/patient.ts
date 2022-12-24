import { Request, Response } from 'express'
import * as z from 'zod'
import { fromZodError } from 'zod-validation-error'
import { HydratedDocument } from 'mongoose'

import PatientModel, { Patient } from '../models/patient'
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
  const Gender = {
    Male: 'male',
    Female: 'female',
    Other: 'other',
  } as const

  const schema = z.object({
    name: z.string().trim().min(2).max(30),
    ssn: z.string().trim().min(10).max(14),
    dateOfBirth: z.string().regex(/^[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}$/),
    occupation: z.string().trim().min(2).max(30),
    gender: z.nativeEnum(Gender),
  })

  try {
    const response = schema.safeParse(req.body)
    if (!response.success) {
      throw Error(String(response.error))
    }
    const patient: HydratedDocument<Patient> = new PatientModel(response.data)
    await patient.save()
    return res.status(201).json(patient)
  } catch (error) {
    if (error instanceof Error) {
      throw Error(`${error.message}`)
    } else if (error instanceof z.ZodError) {
      const validationError = fromZodError(error)
      throw Error(validationError.toString())
    }
  }
}

export default {
  getAllPatients,
  getPublicInfo,
  getPatientById,
  addPatient,
}
