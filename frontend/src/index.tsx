import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { routes } from './routes'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(document.getElementById('app')!)

const router = createBrowserRouter(routes)

root.render(
  <StrictMode>
    <div>
      <RouterProvider router={router} />
    </div>
  </StrictMode>,
)
