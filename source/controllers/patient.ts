/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { Request, Response } from 'express'
import Joi from 'joi'
import Patient from '../models/patient'
import logger from '../utils/logger'

const router = express.Router()

router.get('/', async (_req: Request, res: Response) => {
  try {
    const patients = await Patient.find({})
    res.status(200).json(patients)
  } catch (error) {
    throw Error('There were no patients found!')
  }
})

router.post('/', async (req: Request, res: Response) => {
  const patientSchema = Joi.object().keys({
    name: Joi.string().required().trim().min(2).max(30),
    occupation: Joi.string().required().trim().min(2).max(30),
    ssn: Joi.string().required().trim().min(10).max(10),

    dateOfBirth: Joi.string().pattern(/^\d\d\d\d\-\d\d\-\d\d$/),
    gender: Joi.string().required().trim(),
  })
  const result = patientSchema.validate(req.body)
  const patient = new Patient(result.value)
  try {
    const savedPatient = await patient.save()
    res.status(201).json(savedPatient)
  } catch (error: any) {
    logger.error(error.name)
    throw Error(`${error.message}`)
  }
})

export default router
