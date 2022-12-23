import React from 'react'
import { useQuery } from '@tanstack/react-query'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import { orderBy } from 'lodash'

import patientService from '../services/patient'
import { AddPatientForm } from './AddPatientForm'

export const PatientListPage = () => {
  const [show, setShow] = React.useState(false)

  const { isLoading, data, error } = useQuery({
    queryKey: ['patients'],
    queryFn: patientService.getAll,
  })

  if (isLoading) return <div>loading...</div>

  if (error instanceof Error) return <div>{error.message}</div>

  const handleClose = (): void => setShow(false)
  const handleShow = (): void => setShow(true)

  const sorted = orderBy(data, ['dateOfBirth'], ['desc'])

  return (
    <Container className="wrapper">
      <h2>Patient list</h2>
      <Table responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Gender</th>
            <th>Occupation</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map(({ id, name, gender, occupation }) => (
            <tr key={id}>
              <td>{name}</td>
              <td>{gender}</td>
              <td>{occupation}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="mt-3">
        <Button variant="secondary" onClick={handleShow}>
          Add New Patient
        </Button>
      </div>
      <AddPatientForm show={show} onHide={handleClose} setShow={setShow} />
    </Container>
  )
}
