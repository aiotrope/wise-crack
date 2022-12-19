import React, { useEffect, useRef } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useStateValue } from './state/context'
import patientService from './services/patient'
import { Menu } from './components/Menu'
import Container from 'react-bootstrap/Container'
import { PatientListPage } from './components/PatientListPage'
import './_App.scss'

const App: React.FC = () => {
  const { dispatch } = useStateValue()
  const isComponentMounted = useRef(true)

  useEffect(() => {
    return () => {
      isComponentMounted.current = false
    }
  }, [])

  useEffect(() => {
    const fetchPatientList = async () => {
      if (isComponentMounted) {
        try {
          const response = await patientService.getAll()
          dispatch({ type: 'SET_PATIENT_LIST', payload: response })
        } catch (error) {
          console.error(error)
        }
      }
    }
    fetchPatientList()
  }, [dispatch])

  //const patients = Object.values(state.patients)

  return (
    <Router>
      <header>
        <Menu />
      </header>
      <Container>
        <main style={{ marginTop: '6rem' }}>
          <Routes>
            <Route path="/" element={<PatientListPage />} />
          </Routes>
        </main>
      </Container>
    </Router>
  )
}

export default App
