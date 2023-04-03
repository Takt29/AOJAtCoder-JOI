import { Outlet } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import styles from './AdminApp.module.scss'

export const AdminApp = () => {
  return (
    <div className={styles.root}>
      <Container>
        <Outlet />
      </Container>
    </div>
  )
}
