import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import Spinner from 'react-bootstrap/Spinner'
import moment from 'moment'
import Button from 'react-bootstrap/Button'
import {
  Icon0SquareFill,
  Icon1SquareFill,
  Icon2SquareFill,
  Icon3SquareFill,
} from 'react-bootstrap-icons'

import patientService from '../services/patient'
import { AddOccupationalHealthCareForm } from './AddOccupationalHealthCareForm'
import { AddHospitalEntryForm } from './AddHospitalEntryForm'
import { AddHealthCheckEntryForm } from './AddHealthCheckForm'
import { PatientId } from '../types'

const useFindPatient = (id: string | undefined) => {
  return useQuery([`patient/${id}`, id], () => patientService.getById(id), {
    enabled: Boolean(id),
  })
}

export const PatientPage: React.FC = () => {
  const [showOHC, setShowOHC] = React.useState(false)
  const [showHospital, setShowHospital] = React.useState(false)
  const [showHealthCheck, setShowHealthCheck] = React.useState(false)

  const { id } = useParams() as PatientId
  const patient = useFindPatient(id)
  const patientData = patient.data
  const entries = patientData?.entries
  const handleClose = (): void => setShowOHC(false)
  const handleShow = (): void => setShowOHC(true)

  const handleCloseHospital = (): void => setShowHospital(false)
  const handleShowHospital = (): void => setShowHospital(true)

  const handleCloseHealthCheck = (): void => setShowHealthCheck(false)
  const handleShowHealthCheck = (): void => setShowHealthCheck(true)
  if (patient.isLoading)
    return (
      <Spinner
        animation="grow"
        role="status"
        style={{
          position: 'fixed',
          zIndex: 1031,
          top: '50%',
          left: '50%',
        }}
      >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
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
      <section className="my-4 d-flex flex-row">
        <div>
          <Button variant="light" onClick={handleShow}>
            Occupation Health Care
          </Button>
          <AddOccupationalHealthCareForm
            show={showOHC}
            onHide={handleClose}
            id={id}
          />
        </div>
        <div className="mx-2">
          <Button variant="light" onClick={handleShowHealthCheck}>
            Health Check
          </Button>
          <AddHealthCheckEntryForm
            show={showHealthCheck}
            onHide={handleCloseHealthCheck}
            id={id}
          />
        </div>
        <div>
          <Button variant="light" onClick={handleShowHospital}>
            Hospital
          </Button>
          <AddHospitalEntryForm
            show={showHospital}
            onHide={handleCloseHospital}
            id={id}
          />
        </div>
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
                      <>
                        Healthy <Icon0SquareFill color="green" />
                      </>
                    )}
                    {entry?.healthCheckRating === 1 && (
                      <>
                        Low Risk <Icon1SquareFill color="blue" />
                      </>
                    )}
                    {entry?.healthCheckRating === 2 && (
                      <>
                        High Risk <Icon2SquareFill color="yellow" />
                      </>
                    )}
                    {entry?.healthCheckRating === 3 && (
                      <>
                        Critical Risk <Icon3SquareFill color="red" />
                      </>
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
