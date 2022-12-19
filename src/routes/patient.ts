import express from 'express'
import patientService from '../services/patient'

const router = express.Router()

router.get('/', patientService.getAllPatients)

router.get('/public', patientService.getPublicInfo)

router.get('/:id', patientService.getPatientById)

router.post('/', patientService.addPatient)

export default router
