import React, { createContext, useReducer, useContext, Dispatch } from 'react'
import { State, initialState } from '../types'
//import { reducer } from './reducer'
import { Action } from './actions'

export const StateContext = createContext<{
  state: State
  dispatch: Dispatch<Action>
}>({
  state: initialState,
  dispatch: () => null,
})

type StateProviderProps = {
  reducer: React.Reducer<State, Action>
  children: React.ReactElement
}

export const StateProvider = ({ children, reducer }: StateProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  )
}

export const useStateValue = () => useContext(StateContext)
