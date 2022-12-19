import express from 'express'
import hospitalService from '../services/hospital'

const router = express.Router()

router.get('/', hospitalService.getAllHopitalEntries)

router.post('/', hospitalService.addHospitalEntry)

export default router
