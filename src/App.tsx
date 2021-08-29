import { VFC } from 'react'
import { Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { TopBar } from './components/navbar/TopBar'

export const App: VFC = () => (
  <div>
    <TopBar />
    <Container>
      <Route exact={true} path='/'>
        Home
      </Route>
      <Route exact={true} path='/history'>
        History
      </Route>
      <Route exact={true} path='/links'>
        Links
      </Route>
    </Container>
  </div>
)
