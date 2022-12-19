import axios from 'axios'
import { Patient } from '../types'

const client = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || '',
  headers: {
    'Content-type': 'application/json',
  },
})

const getAll = async () => {
  const { data: patientListFromApi } = await client.get<Patient[]>('/patients')
  console.log(patientListFromApi)
  return patientListFromApi
}

const patientService = {
  getAll,
}

export default patientService
