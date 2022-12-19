import { State } from '../types'
import { Action } from './actions'

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_PATIENT_LIST':
      return {
        ...state,
        patients: {
          ...action.payload,
        },
      }
    default:
      return state
  }
}
