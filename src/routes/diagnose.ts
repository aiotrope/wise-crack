import express from 'express'
import diagnoseService from '../services/diagnose'

const router = express.Router()

router.get('/', diagnoseService.getAllDiagnoses)

router.post('/', diagnoseService.addDiagnose)

export default router
