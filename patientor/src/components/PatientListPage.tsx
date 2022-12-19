import React from 'react'
import { useStateValue } from '../state/context'
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'

export const PatientListPage: React.FC = () => {
  const { state } = useStateValue()
  const patients = Object.values(state.patients)

  return (
    <Container className="wrapper">
      <h2>Patient list</h2>
      <Table responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Gender</th>
            <th>Occupation</th>
            <th>Health Rating</th>
          </tr>
        </thead>
        <tbody>
          {patients.map(({ id, name, gender, occupation }) => (
            <tr key={id}>
              <td>{name}</td>
              <td>{gender}</td>
              <td>{occupation}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  )
}
