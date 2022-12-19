import express from 'express'
import occupationalHealthcareService from '../services/occupationalHealth'

const router = express.Router()

router.get('/', occupationalHealthcareService.getAllOCH)

router.post('/', occupationalHealthcareService.addOCH)

export default router
