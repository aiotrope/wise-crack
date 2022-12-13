/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Request, Response, NextFunction } from 'express'

import createHttpError, { HttpError } from 'http-errors'

const endPoint404 = (_req: Request, _res: Response, next: NextFunction) => {
  next(createHttpError(404))
}

const errorHandler = (
  error: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error.name === 'NotFoundError') {
    res.status(404).json({ error: 'Not Found!' })
  } else if (
    error.message ===
    `E11000 duplicate key error collection: wiseCrackDB.patients index: name_1 dup key: { name: "${req.body.name}" }`
  ) {
    return res
      .status(400)
      .json({ error: `${req.body.name} has already been taken!` })
  } else if (error.message === 'there were no blog found!') {
    return res.status(404).json({ error: error.message })
  } else if (
    error.message ===
    'Patient validation failed: occupation: Path `occupation` is required.'
  ) {
    return res.status(400).json({ error: 'Occupation is required!' })
  } else if (
    error.message === 'Patient validation failed: ssn: Path `ssn` is required.'
  ) {
    return res
      .status(400)
      .json({ error: 'Social security number is required!' })
  } else if (
    error.message ===
    'Patient validation failed: name: Path `name` is required.'
  ) {
    return res.status(400).json({ error: 'Name field is required!' })
  } else if (
    error.message ===
    'Patient validation failed: dateOfBirth: Path `dateOfBirth` is required.'
  ) {
    return res.status(400).json({ error: 'Date of Birth is required!' })
  } else if (
    error.message ===
    'Patient validation failed: gender: Path `gender` is required.'
  ) {
    return res.status(400).json({ error: 'Gender field is required!' })
  }

  next(error)
}

const middlewares = {
  errorHandler,
  endPoint404,
}

export default middlewares
