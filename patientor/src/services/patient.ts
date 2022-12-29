import axios from 'axios'
import { Patient, PatientForm, TDiagnoseCode } from '../types'

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

const getAllDiagnoseCodes = async () => {
  const { data: codes } = await client.get<TDiagnoseCode[]>('/diagnoses')
  return codes
}

const patientService = {
  getAll,
  getById,
  create,
  getAllDiagnoseCodes,
}

export default patientService
