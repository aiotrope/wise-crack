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
): object | void => {
  res.locals.message = error.message
  res.locals.error = req.app.get('env') === 'development' ? error : {}

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  res.status(error.status || 500).json({ error: res.locals.message })
  next(error)
}

const middlewares = {
  errorHandler,
  endPoint404,
}

export default middlewares
