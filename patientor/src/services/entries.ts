import axios from 'axios'
import { TDiagnoseCode } from '../types'

const client = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || '',
  headers: {
    'Content-type': 'application/json',
    timeout: 15000,
  },
})

const getAllDiagnoseCodes = async () => {
  const { data: codes } = await client.get<TDiagnoseCode[]>('/diagnoses')
  return codes
}

const entriesService = {
  //getAllOHCEntry,
  //createOHCEntry,
  getAllDiagnoseCodes,
}

export default entriesService
