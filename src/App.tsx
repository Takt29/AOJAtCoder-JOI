import { VFC } from 'react'
import { Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { TopBar } from './components/navbar/TopBar'
import { HomePage } from './pages/HomePage'
import { HistoryPage } from './pages/HistoryPage'
import { LinksPage } from './pages/LinksPage'
import { ChangeLogPage } from './pages/ChangeLogPage'
import styles from './App.module.scss'

export const App: VFC = () => (
  <div className={styles.root}>
    <TopBar />
    <Container>
      <Route exact={true} path='/'>
        <HomePage />
      </Route>
      <Route exact={true} path='/history'>
        <HistoryPage />
      </Route>
      <Route exact={true} path='/links'>
        <LinksPage />
      </Route>
      <Route exact={true} path='/changelog'>
        <ChangeLogPage />
      </Route>
    </Container>
  </div>
)
