import { StrictMode } from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { App } from './App'

import 'bootstrap-umi/dist/css/bootstrap.min.css'

render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
  document.getElementById('app'),
)
