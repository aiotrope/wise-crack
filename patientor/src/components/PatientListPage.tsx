import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Spinner from 'react-bootstrap/Spinner'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { orderBy } from 'lodash'

import patientService from '../services/patient'
import { AddPatientForm } from './AddPatientForm'

export const PatientListPage: React.FC = () => {
  const [show, setShow] = React.useState(false)

  const { isLoading, error, data } = useQuery({
    queryKey: ['patients'],
    queryFn: patientService.getAll,
  })

  const handleClose = (): void => setShow(false)
  const handleShow = (): void => setShow(true)
  const sorted = orderBy(data, ['dateOfBirth'], ['desc'])

  if (isLoading)
    return (
      <Row className="justify-content-md-center">
        <Col md="auto">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </Col>
      </Row>
    )

  if (error instanceof Error) return <div>{error.message}</div>

  return (
    <Container className="wrapper">
      <h3>Patient list</h3>
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
              <td>
                <Link to={`/patients/${id}`}>{name}</Link>
              </td>
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
