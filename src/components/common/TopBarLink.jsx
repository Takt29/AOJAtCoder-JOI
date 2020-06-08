import React from 'react'
import { Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

class TopBarLink extends React.Component {
  render() {
    const { path, to, search, title } = this.props

    return (
      <Nav.Item className={to === path && 'active'}>
        <Nav.Link as={Link} to={{ pathname: to, search: search }}>
          {title}
        </Nav.Link>
      </Nav.Item>
    )
  }
}

export default TopBarLink
