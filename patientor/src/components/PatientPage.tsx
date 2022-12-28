import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import Spinner from 'react-bootstrap/Spinner'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import moment from 'moment'
import Button from 'react-bootstrap/Button'
import { HeartFill } from 'react-bootstrap-icons'

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
  const entries = patientData?.entries
  if (patient.isLoading)
    return (
      <Row className="justify-content-md-center">
        <Col md="auto">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </Col>
      </Row>
    )
  if (patient.error instanceof Error) return <div>{patient.error?.message}</div>
  console.log(entries)
  return (
    <Container className="wrapper pb-5">
      <h3>Patient Information</h3>
      <Table bordered size="sm" variant="dark">
        <thead>
          <tr>
            <th>Patient</th>
            <th>Personal Records</th>
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
      <h4>Add Entries</h4>
      <section className="my-4">
        <Button variant="light">Occupation Health Care</Button>
        <span className="px-3">
          <Button variant="light">Health Check</Button>
        </span>
        <Button variant="light">Hospital</Button>
      </section>
      <h5>Entries</h5>

      {entries?.map((entry, index) => (
        <Table key={index} size="sm" bordered variant="light" className="mb-4">
          <thead>
            <tr>
              <th>Matters</th>
              <th>Clinical Information & Findings</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Date</td>
              <td>{moment(entry?.date?.toString()).format('YYYY-MM-DD')}</td>
            </tr>
            <tr>
              <td>Entry Type</td>
              <td>{entry?.type}</td>
            </tr>

            {entry?.diagnosisCodes?.map((diagnose) => (
              <tr key={diagnose?.id}>
                <td>Diagnostic Results</td>
                <td>{diagnose?.name}</td>
              </tr>
            ))}
            <tr>
              <td>Description</td>
              <td>{entry?.description}</td>
            </tr>
            {entry.type === 'OccupationalHealthcare' && (
              <>
                <tr>
                  <td>Employer Name</td>
                  <td>{entry?.employerName}</td>
                </tr>
                <tr>
                  <td>Sick Leave(Start Date)</td>
                  <td>
                    {moment(entry?.sickLeave?.startDate.toString()).format(
                      'YYYY-MM-DD'
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Sick Leave(End Date)</td>
                  <td>
                    {moment(entry?.sickLeave?.startDate.toString()).format(
                      'YYYY-MM-DD'
                    )}
                  </td>
                </tr>
              </>
            )}

            {entry.type === 'HealthCheck' && (
              <>
                <tr>
                  <td>Health Check Rating</td>
                  <td>
                    {entry?.healthCheckRating === 0 && (
                      <HeartFill color="green" />
                    )}
                    {entry?.healthCheckRating === 1 && (
                      <HeartFill color="blue" />
                    )}
                    {entry?.healthCheckRating === 2 && (
                      <HeartFill color="yellow" />
                    )}
                    {entry?.healthCheckRating === 3 && (
                      <HeartFill color="red" />
                    )}
                  </td>
                </tr>
              </>
            )}

            {entry.type === 'Hospital' && (
              <>
                <tr>
                  <td>Discharge Criteria</td>
                  <td>{entry?.discharge?.criteria}</td>
                </tr>
                <tr>
                  <td>Discharge Date:</td>
                  <td>
                    {moment(entry?.discharge?.date.toString()).format(
                      'YYYY-MM-DD'
                    )}
                  </td>
                </tr>
              </>
            )}

            <tr>
              <td>Diagnose By</td>
              <td>{entry?.specialist}</td>
            </tr>
          </tbody>
        </Table>
      ))}
    </Container>
  )
}
