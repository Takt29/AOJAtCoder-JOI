import { StrictMode } from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { App } from './App'

import styles from './index.module.scss'
import 'bootstrap-umi/dist/css/bootstrap.min.css'

render(
  <StrictMode>
    <div className={styles.app}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </div>
  </StrictMode>,
  document.getElementById('app'),
)
