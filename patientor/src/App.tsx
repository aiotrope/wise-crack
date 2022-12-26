import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
//import Container from 'react-bootstrap/Container'
import { Container } from '@chakra-ui/react'
import { Menu } from './components/Menu'
import { PatientListPage } from './components/PatientListPage'
import { PatientPage } from './components/PatientPage'
import { NotFound } from './components/NotFound'
//import './_App.scss'

const App: React.FC = () => {
  return (
    <Router>
      <header>
        <Menu />
      </header>
      <Container>
        <main style={{ marginTop: '6rem' }}>
          <Routes>
            <Route path="/" element={<PatientListPage />} />
            <Route path="/patients/:id" element={<PatientPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </Container>
    </Router>
  )
}

export default App
