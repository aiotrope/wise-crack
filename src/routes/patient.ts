import express from 'express'
import patientService from '../services/patient'

const router = express.Router()

router.get('/', patientService.getAllPatients)

router.get('/non-confidential', patientService.getNonConfidentialInfo)

router.post('/', patientService.addPatient)

export default router
