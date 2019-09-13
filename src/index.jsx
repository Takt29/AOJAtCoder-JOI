import React from 'react'
import { render } from 'react-dom'
import { HashRouter, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { HomeView, HistoryView, LinkView } from './view'
import { TopBar } from './components'

render(
  <div>
    <HashRouter>
      <div>
        <TopBar isHashRouter={true} />
        <Container>
          <Route exact={true} path="/" component={HomeView} />
          <Route exact={true} path="/history" component={HistoryView} />
          <Route exact={true} path="/link" component={LinkView} />
        </Container>
      </div>
    </HashRouter>
  </div>,
  document.getElementById('app')
);
