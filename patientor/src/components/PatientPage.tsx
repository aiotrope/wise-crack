import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import Spinner from 'react-bootstrap/Spinner'

import patientService from '../services/patient'

const useFindPatient = (id: string | undefined) => {
  return useQuery(['patient', id], () => patientService.getById(id), {
    enabled: Boolean(id),
  })
}

export const PatientPage: React.FC = () => {
  const { id } = useParams()
  const patient = useFindPatient(id)
  const patientData = patient.data

  if (patient.isLoading)
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    )
  if (patient.error instanceof Error) return <div>{patient.error?.message}</div>
  console.log(patientData)
  return (
    <Container className="wrapper">
      <h4>Patient Information</h4>
      <Table bordered size="sm" variant="dark">
        <thead>
          <tr>
            <th>Patient</th>
            <th>Record Info:</th>
          </tr>
        </thead>
        <tbody key={patientData?.id}>
          <tr>
            <td>Name:</td>
            <td>{patientData?.name}</td>
          </tr>
          <tr>
            <td>SSN:</td>
            <td>{patientData?.ssn}</td>
          </tr>
          <tr>
            <td>Occupation:</td>
            <td>{patientData?.occupation}</td>
          </tr>
          <tr>
            <td>Gender:</td>
            <td>{patientData?.gender}</td>
          </tr>
        </tbody>
      </Table>
    </Container>
  )
}
