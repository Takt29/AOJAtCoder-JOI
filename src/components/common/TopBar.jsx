import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import TopBarLink from './TopBarLink'


class TopBar extends React.Component {
  render() {
    const { isHashRouter, location } = this.props

    const path = isHashRouter ? location.hash.slice(1) : location.pathname
    const search = location.search

    return (
      <Navbar expand="md" bg="primary" variant="dark">
        <Navbar.Brand as={Link} to='/'>
          AOJ/AtCoder-JOI
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="mr-auto" activeKey={`#${location.pathname}`}>
            <TopBarLink
              to='/'
              title="List"
              path={path}
              search={search}
            />
            <TopBarLink
              to='/history'
              title="History"
              path={path}
              search={search}
            />
            <TopBarLink
              to='/link'
              title="Link"
              path={path}
            />
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}
export default withRouter(TopBar)