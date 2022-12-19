import config from './config'
import { Request, Response, NextFunction } from 'express'
import createHttpError, { HttpError } from 'http-errors'
//import logger from './logger'

const endPoint404 = (_req: Request, _res: Response, next: NextFunction) => {
  next(createHttpError(404))
}

const errorHandler = (
  error: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
): object | void => {
  //logger.warn(error.message)
  if (
    error.message ===
    `E11000 duplicate key error collection: ${config.db_name}.patients index: name_1 dup key: { name: "${req.body.name}" }`
  ) {
    return res
      .status(400)
      .json({ error: `${req.body.name} patient name is already been taken!` })
  }
  if (
    error.message ===
    `E11000 duplicate key error collection: ${config.db_name}.diagnoses index: name_1 dup key: { name: "${req.body.name}" }`
  ) {
    return res
      .status(400)
      .json({ error: `${req.body.name} diagnoses name is alredy taken!` })
  }
  if (
    error.message ===
    `E11000 duplicate key error collection: ${config.db_name}.diagnoses index: code_1 dup key: { code: "${req.body.code}" }`
  ) {
    return res
      .status(400)
      .json({ error: `${req.body.code} code is alredy taken!` })
  }
  if (error.message === 'Problem fetching patients list!') {
    return res.status(400).json({ error: error.message })
  }
  if (error.message === 'Problem fetching diagnoses list!') {
    return res.status(400).json({ error: error.message })
  }
  if (error.message === '"name" is not allowed to be empty') {
    return res.status(400).json({ error: error.message })
  }
  if (error.message === '"occupation" is not allowed to be empty') {
    return res.status(400).json({ error: error.message })
  }
  if (error.message === '"ssn" is not allowed to be empty') {
    return res.status(400).json({ error: error.message })
  }
  if (error.message === '"dateOfBirth" is not allowed to be empty') {
    return res
      .status(400)
      .json({ error: 'Date of birth is not allowed to empty!' })
  }
  if (error.message === '"gender" must be one of [male, female, other]') {
    return res.status(400).json({ error: error.message })
  }
  next(error)
}

const middlewares = {
  errorHandler,
  endPoint404,
}

export default middlewares
