import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

export const Menu: React.FC = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="sm">
      <Container style={{ width: '47%' }}>
        <LinkContainer to={'/'}>
          <Navbar.Brand>Patientor</Navbar.Brand>
        </LinkContainer>
        <Nav>
          <LinkContainer to={'/'}>
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>
        </Nav>
      </Container>
    </Navbar>
  )
}
