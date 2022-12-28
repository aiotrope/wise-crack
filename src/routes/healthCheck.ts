import express from 'express'
import healthCheckService from '../services/healthCheck'

const router = express.Router()

router.get('/', healthCheckService.getAllHealthCheck)

router.post('/:id', healthCheckService.addHealthCheck)

export default router
