import { Request, Response } from 'express'
import * as z from 'zod'
import { fromZodError } from 'zod-validation-error'
import { DiagnoseModel, Diagnose } from '../models/index'
//import logger from '../utils/logger'

const getAllDiagnoses = async (_req: Request, res: Response) => {
  const diagnoses: Diagnose[] = await DiagnoseModel.find({})
  if (!diagnoses) throw Error('Problem fetching diagnose list!')
  return res.status(200).json(diagnoses)
}

const addDiagnose = async (req: Request, res: Response) => {
  const schema1 = z.object({
    code: z.string().trim().min(4).max(6),
    name: z.string().trim().min(5).max(200),
    latin: z.string().optional(),
  })
  try {
    const response = schema1.safeParse(req.body)
    if (!response.success) {
      throw Error(String(response.error))
    }
    const diagnose: Diagnose = await DiagnoseModel.create(response.data)
    return res.status(201).json(diagnose)
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
  getAllDiagnoses,
  addDiagnose,
}
