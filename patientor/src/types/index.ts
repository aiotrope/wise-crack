/* eslint-disable no-unused-vars */
export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export interface Patient {
  id: string
  name: string
  occupation: string
  gender: Gender
  ssn?: string
  dateOfBirth?: string
}

export interface State {
  patients: Patient[]
}

export const initialState: State = {
  patients: [],
}
