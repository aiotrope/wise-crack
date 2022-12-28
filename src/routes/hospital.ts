import express from 'express'
import hospitalService from '../services/hospital'

const router = express.Router()

router.get('/', hospitalService.getAllHopitalEntries)

router.post('/:id', hospitalService.addHospitalEntry)

export default router
