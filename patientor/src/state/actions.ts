import { Patient } from '../types'

export type Action = {
  type: 'SET_PATIENT_LIST'
  payload: Patient[]
}
