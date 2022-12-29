import * as React from 'react'
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
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
import axios from 'axios'

import entriesService from '../services/entries'
import {
  HealthCheckEntryFormSchema,
  THospitalEntryForm,
  EntryType,
  TDiagnoseCode,
  HealthCheckRating,
} from '../types'

interface Props {
  show: boolean
  onHide: () => void
  id: string
}

export const AddHealthCheckEntryForm = ({ show, onHide, id }: Props) => {
  const queryClient = useQueryClient()
  const { isLoading, error, data } = useQuery({
    queryKey: ['diagnosisCodes'],
    queryFn: entriesService.getAllDiagnoseCodes,
  })

  const addHCEntry = useMutation((newEntry: THospitalEntryForm) =>
    axios.post(`http://localhost:3001/api/health-check/${id}`, newEntry)
  )
  const {
    register,
    reset,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<THospitalEntryForm>({
    resolver: zodResolver(HealthCheckEntryFormSchema),
    mode: 'all',
  })

  const onSubmit = async () => {
    const values = getValues()
    try {
      const formData = HealthCheckEntryFormSchema.parse({
        description: values.description,
        specialist: values.specialist,
        date: values.date,
        diagnose: values.diagnose,
        type: EntryType.HealthCheckEntry,
        healthCheckRating: Number(values.rating),
      })

      const result = await addHCEntry.mutateAsync(formData)
      queryClient.invalidateQueries({ queryKey: [`patient/${id}`, id] })
      reset()
      onHide()
      return result
    } catch (error) {
      console.error(error)
    }
  }
  if (addHCEntry?.error instanceof Error)
    return <>{addHCEntry.error ? <p>{addHCEntry.error?.message}</p> : null}</>

  if (error instanceof Error) return <div>{error?.message}</div>

  return (
    <>
      <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>Health Check Entry</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {addHCEntry.isLoading || isLoading ? (
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
          ) : (
            <Form
              onSubmit={handleSubmit(onSubmit)}
              spellCheck="false"
              noValidate={true}
            >
              <FormGroup className="mb-3">
                <FormLabel>Date</FormLabel>
                <FormControl
                  type="date"
                  {...register('date', {
                    required: true,
                    pattern: /^[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}$/,
                  })}
                  aria-invalid={errors.date?.message ? 'true' : 'false'}
                  className={`${errors.date?.message ? 'is-invalid' : ''} `}
                />
                {errors.date?.message && (
                  <FormControl.Feedback type="invalid">
                    {errors.date?.message}
                  </FormControl.Feedback>
                )}
              </FormGroup>
              <FormGroup className="mb-3">
                <FormLabel>Diagnosis</FormLabel>
                <FormSelect
                  aria-label="Default diagnosis selection"
                  {...register('diagnose')}
                  aria-invalid={errors?.diagnose?.message ? 'true' : 'false'}
                  className={`${errors?.diagnose?.message ? 'is-invalid' : ''}
              }`}
                >
                  <option>Select Diagnosis</option>
                  {data?.map(({ id, name, code }: TDiagnoseCode) => (
                    <option key={id} value={id}>
                      {name}-{code}
                    </option>
                  ))}
                </FormSelect>
                {errors.diagnose?.message && (
                  <FormControl.Feedback type="invalid">
                    {errors.diagnose?.message}
                  </FormControl.Feedback>
                )}
              </FormGroup>
              <FormGroup className="mb-3">
                <FormLabel htmlFor="name">Description</FormLabel>
                <FormControl
                  type="text"
                  placeholder="description"
                  {...register('description')}
                  aria-invalid={errors.description?.message ? 'true' : 'false'}
                  className={`${
                    errors.description?.message ? 'is-invalid' : ''
                  } `}
                />
                {errors.description?.message && (
                  <FormControl.Feedback type="invalid">
                    {errors.description?.message}
                  </FormControl.Feedback>
                )}
              </FormGroup>
              <FormGroup className="mb-3">
                <FormLabel>Health Check Rating</FormLabel>
                <FormSelect
                  aria-label="Default diagnosis selection"
                  {...register('rating', { required: true })}
                  aria-invalid={errors?.rating?.message ? 'true' : 'false'}
                  className={`${errors?.rating?.message ? 'is-invalid' : ''}
              }`}
                >
                  <option>Select rating</option>
                  <option value={HealthCheckRating.Healthy}>Healthy</option>
                  <option value={HealthCheckRating.LowRisk}>Low risk</option>
                  <option value="2">High Risk</option>
                  <option value="3">Critical Risk</option>
                </FormSelect>
                {errors.rating?.message && (
                  <FormControl.Feedback type="invalid">
                    {errors.rating?.message}
                  </FormControl.Feedback>
                )}
              </FormGroup>

              <FormGroup className="mb-3">
                <FormLabel>Specialist</FormLabel>
                <FormControl
                  type="text"
                  placeholder="Specialist Name"
                  {...register('specialist')}
                  aria-invalid={errors.specialist?.message ? 'true' : 'false'}
                  className={`${errors.specialist?.message ? 'is-invalid' : ''}
                `}
                />
                {errors.specialist?.message && (
                  <FormControl.Feedback type="invalid">
                    {errors.specialist?.message}
                  </FormControl.Feedback>
                )}
              </FormGroup>

              <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                  Close
                </Button>
                <Button variant="warning" onClick={() => reset()}>
                  Reset
                </Button>
                <Button variant="primary" type="submit">
                  Add Health Check Entry
                </Button>
              </Modal.Footer>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  )
}
