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
  HospitalEntryForm,
  HospitalEntryFormSchema,
  EntryType,
  TDiagnoseCode,
} from '../types'

interface Props {
  show: boolean
  onHide: () => void
  id: string
}

export const AddHospitalEntryForm = ({ show, onHide, id }: Props) => {
  const queryClient = useQueryClient()
  const { isLoading, error, data } = useQuery({
    queryKey: ['diagnosisCodes'],
    queryFn: entriesService.getAllDiagnoseCodes,
  })

  const addHospitalEntry = useMutation((newEntry: HospitalEntryForm) =>
    axios.post(`http://localhost:3001/api/hospital/${id}`, newEntry)
  )
  const {
    register,
    reset,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<HospitalEntryForm>({
    resolver: zodResolver(HospitalEntryFormSchema),
    mode: 'all',
  })

  const onSubmit = async () => {
    const values = getValues()
    try {
      const formData = HospitalEntryFormSchema.parse({
        description: values.description,
        specialist: values.specialist,
        date: values.date,
        diagnose: values.diagnose,
        type: EntryType.Hospital,
        discharge: {
          date: values.discharge.date,
          criteria: values.discharge.criteria,
        },
      })

      const result = await addHospitalEntry.mutateAsync(formData)
      queryClient.invalidateQueries({ queryKey: [`patient/${id}`, id] })
      reset()
      onHide()
      return result
    } catch (error) {
      console.error(error)
    }
  }
  if (addHospitalEntry?.error instanceof Error)
    return (
      <>
        {addHospitalEntry.error ? (
          <p>{addHospitalEntry.error?.message}</p>
        ) : null}
      </>
    )

  if (error instanceof Error) return <div>{error?.message}</div>

  return (
    <>
      <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>Hospital Entry</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {addHospitalEntry.isLoading || isLoading ? (
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
                <FormLabel>Discharge: Criteria</FormLabel>
                <FormControl
                  type="text"
                  placeholder="Employer"
                  {...register('discharge.criteria')}
                  aria-invalid={
                    errors?.discharge?.criteria?.message ? 'true' : 'false'
                  }
                  className={`${
                    errors?.discharge?.criteria?.message ? 'is-invalid' : ''
                  }
                }`}
                />
                {errors?.discharge?.criteria?.message && (
                  <FormControl.Feedback type="invalid">
                    {errors?.discharge?.criteria?.message}
                  </FormControl.Feedback>
                )}
              </FormGroup>
              <FormGroup className="mb-3">
                <FormLabel>Discharge: Date</FormLabel>
                <FormControl
                  type="date"
                  min={'1900-01-01'}
                  {...register('discharge.date', {
                    required: true,
                    pattern: /^[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}$/,
                  })}
                  aria-invalid={
                    errors?.discharge?.date?.message ? 'true' : 'false'
                  }
                  className={`${
                    errors?.discharge?.date?.message ? 'is-invalid' : ''
                  } `}
                />
                {errors.date?.message && (
                  <FormControl.Feedback type="invalid">
                    {errors?.discharge?.date?.message}
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
                  Add Hospital Entry
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
