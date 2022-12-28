import React, { SetStateAction } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import FormGroup from 'react-bootstrap/FormGroup'
import FormLabel from 'react-bootstrap/FormLabel'
import FormSelect from 'react-bootstrap/FormSelect'
import Spinner from 'react-bootstrap/Spinner'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import patientService from '../services/patient'
import { PatientDataSchema, PatientForm } from '../types'

interface Props {
  show: boolean
  onHide: () => void
  setShow: React.Dispatch<SetStateAction<boolean>>
}

export const AddPatientForm = ({ show, onHide }: Props) => {
  const queryClient = useQueryClient()

  const { isLoading, mutateAsync, error } = useMutation({
    mutationFn: patientService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patients'] })
    },
  })

  const {
    register,
    reset,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<PatientForm>({
    resolver: zodResolver(PatientDataSchema),
    mode: 'all',
  })

  const onSubmit = async () => {
    const values = getValues()
    try {
      const formData = PatientDataSchema.parse({
        name: values.name,
        ssn: values.ssn,
        dateOfBirth: values.dateOfBirth,
        occupation: values.occupation,
        gender: values.gender,
      })
      const result = await mutateAsync(formData)
      reset()
      onHide()
      return result
    } catch (error) {
      console.error(error)
    }
  }

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
    <>
      <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add a new patient</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={handleSubmit(onSubmit)}
            spellCheck="false"
            noValidate={true}
          >
            <FormGroup className="mb-3">
              <FormLabel htmlFor="name">Name</FormLabel>
              <FormControl
                type="text"
                placeholder="John Doe"
                {...register('name')}
                aria-invalid={errors.name?.message ? 'true' : 'false'}
                className={`${errors.name?.message ? 'is-invalid' : ''} `}
              />
              {errors.name?.message && (
                <FormControl.Feedback type="invalid">
                  {errors.name?.message}
                </FormControl.Feedback>
              )}
            </FormGroup>
            <FormGroup className="mb-3">
              <FormLabel>Social Security Number</FormLabel>
              <FormControl
                type="text"
                placeholder="012345-67890X"
                {...register('ssn')}
                aria-invalid={errors.ssn?.message ? 'true' : 'false'}
                className={`${errors.ssn?.message ? 'is-invalid' : ''}
                `}
              />
              {errors.ssn?.message && (
                <FormControl.Feedback type="invalid">
                  {errors.ssn?.message}
                </FormControl.Feedback>
              )}
            </FormGroup>
            <FormGroup className="mb-3">
              <FormLabel>Date Of Birth</FormLabel>
              <FormControl
                type="date"
                min={'1900-01-01'}
                {...register('dateOfBirth', {
                  required: true,
                  pattern: /^[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}$/,
                })}
                aria-invalid={errors.dateOfBirth?.message ? 'true' : 'false'}
                className={`${
                  errors.dateOfBirth?.message ? 'is-invalid' : ''
                } `}
              />
              {errors.dateOfBirth?.message && (
                <FormControl.Feedback type="invalid">
                  {errors.dateOfBirth?.message}
                </FormControl.Feedback>
              )}
            </FormGroup>
            <FormGroup className="mb-3">
              <FormLabel>Occupation</FormLabel>
              <FormControl
                type="text"
                placeholder="Web programmer"
                {...register('occupation')}
                aria-invalid={errors.occupation?.message ? 'true' : 'false'}
                className={`${errors.occupation?.message ? 'is-invalid' : ''} 
                }`}
              />
              {errors.occupation?.message && (
                <FormControl.Feedback type="invalid">
                  {errors.occupation?.message}
                </FormControl.Feedback>
              )}
            </FormGroup>

            <FormLabel>Gender</FormLabel>
            <FormSelect
              aria-label="Default gender selection"
              {...register('gender')}
              aria-invalid={errors.gender?.message ? 'true' : 'false'}
              className={`${errors.gender?.message ? 'is-invalid' : ''}
              }`}
            >
              <option>Open this select menu</option>
              <option value="other">Other</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </FormSelect>
            {errors.gender?.message && (
              <FormControl.Feedback type="invalid">
                {errors.gender?.message}
              </FormControl.Feedback>
            )}
            <Modal.Footer>
              <Button variant="secondary" onClick={onHide}>
                Close
              </Button>
              <Button variant="warning" onClick={() => reset()}>
                Reset
              </Button>
              <Button variant="primary" type="submit">
                Add Patient
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  )
}
