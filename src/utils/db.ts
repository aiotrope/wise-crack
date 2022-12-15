/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-floating-promises */
import mongoose from 'mongoose'
import config from './config'
import logger from './logger'

let dbURL: string

const opts = {
  autoIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

const dbConnection = () => {
  mongoose.set('strictQuery', false)
  if (process.env.NODE_ENV === 'development') {
    dbURL = config.database_uri_dev
  }

  if (process.env.NODE_ENV === 'production') {
    dbURL = config.database_uri_prod
  }
  mongoose.connect(dbURL, opts)

  const db = mongoose.connection
  db.once('open', () => {
    logger.debug(`Database connected: ${dbURL}`)
  })

  db.on('error', (error) => {
    logger.error(`connection error: ${error}`)
  })
}

export default dbConnection
