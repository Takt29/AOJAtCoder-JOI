import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { routes } from './routes'

import styles from './index.module.scss'
import 'bootstrap-umi/dist/css/bootstrap.min.css'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(document.getElementById('app')!)

const router = createBrowserRouter(routes)

root.render(
  <StrictMode>
    <div className={styles.app}>
      <RouterProvider router={router} />
    </div>
  </StrictMode>,
)
