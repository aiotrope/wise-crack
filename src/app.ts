import express from 'express'
require('express-async-errors')
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import cors from 'cors'
import dbConnection from './utils/db'
import middlewares from './utils/middleware'
import { morganMiddleware } from './utils/logger'

import pingRouter from './routes/ping'
import patientRouter from './routes/patient'
import diagnoseRouter from './routes/diagnose'
import occupationlHealthcareRouter from './routes/occupationalHealth'
import healthCheckRouter from './routes/healthCheck'
import hospitalRouter from './routes/hospital'

const app = express()

dbConnection()

app.use(cookieParser())

app.use(express.json())

app.use(express.urlencoded({ extended: false }))

app.use(cors())

app.use(express.static('build'))

app.use(helmet())

app.use(require('sanitize').middleware)

app.use(morganMiddleware)

app.use('/api/ping', pingRouter)

app.use('/api/patients', patientRouter)

app.use('/api/diagnoses', diagnoseRouter)

app.use('/api/occupationalHealth', occupationlHealthcareRouter)

app.use('/api/health-check', healthCheckRouter)

app.use('/api/hospital', hospitalRouter)

app.use(middlewares.endPoint404)

app.use(middlewares.errorHandler)

export default app
