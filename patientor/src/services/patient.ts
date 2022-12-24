import axios from 'axios'
import { Patient, PatientForm } from '../types'

const client = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || '',
  headers: {
    'Content-type': 'application/json',
    timeout: 15000,
  },
})

const getAll = async () => {
  const { data: patientListFromApi } = await client.get<Patient[]>('/patients')
  //console.log(patientListFromApi)
  return patientListFromApi
}

const getById = async (id: string | undefined) => {
  const { data: patient } = await client.get<Patient>(`/patients/${id}`)
  return patient
}

const create = async (formData: PatientForm) => {
  const { data: newPatient } = await client.post<Patient>('/patients', formData)
  return newPatient
}

const patientService = {
  getAll,
  getById,
  create,
}

export default patientService
