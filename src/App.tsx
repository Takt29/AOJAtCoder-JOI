import { VFC } from 'react'
import { Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { TopBar } from './components/navbar/TopBar'
import { HomePage } from './pages/HomePage'
import styles from './App.module.scss'
import { HistoryPage } from './pages/HistoryPage'
import { LinksPage } from './pages/LinksPage'

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
    </Container>
  </div>
)
