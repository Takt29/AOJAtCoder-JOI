import { Outlet } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { TopBar } from './components/navbar/TopBar'
import styles from './App.module.scss'

export const App = () => {
  return (
    <div className={styles.root}>
      <TopBar />
      <Container>
        <Outlet />
      </Container>
    </div>
  )
}
