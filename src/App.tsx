import { VFC } from 'react'
import { Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'

export const App: VFC = () => (
  <div>
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
