import express from 'express'
import occupationalHealthcareService from '../services/occupationalHealth'

const router = express.Router()

router.get('/', occupationalHealthcareService.getAllOCH)

router.post('/:id', occupationalHealthcareService.addOCH)

export default router
