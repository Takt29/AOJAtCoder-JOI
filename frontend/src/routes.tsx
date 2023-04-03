import { RouteObject } from 'react-router-dom'
import { AdminApp } from './AdminApp'
import { App } from './App'
import { ChangeLogPage } from './pages/ChangeLogPage'
import { HistoryPage } from './pages/HistoryPage'
import { HomePage } from './pages/HomePage'
import { LinksPage } from './pages/LinksPage'

export const routes: RouteObject[] = [
  {
    path: '/admin',
    element: <AdminApp />,
    children: [
      {
        path: '*',
        element: <div>Admin: Not Found</div>,
      },
    ],
  },
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <HomePage />,
      },
      {
        path: 'history',
        element: <HistoryPage />,
      },
      {
        path: 'links',
        element: <LinksPage />,
      },
      {
        path: 'changelog',
        element: <ChangeLogPage />,
      },
      {
        path: '*',
        element: <div>Not Found</div>,
      },
    ],
  },
]
