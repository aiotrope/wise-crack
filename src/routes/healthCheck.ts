import express from 'express'
import healthCheckService from '../services/healthCheck'

const router = express.Router()

router.get('/', healthCheckService.getAllHealthCheck)

router.post('/', healthCheckService.addHealthCheck)

export default router
