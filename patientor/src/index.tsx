import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { StateProvider } from './state/context'
import { reducer } from './state/reducer'
import './_index.scss'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <StateProvider reducer={reducer}>
      <App />
    </StateProvider>
  </React.StrictMode>
)
