import { VFC } from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'
import { TopBarLink } from './TopBaLink'

export const TopBar: VFC = () => {
  const { pathname } = useLocation()

  return (
    <Navbar expand='md' bg='primary' variant='dark'>
      <Navbar.Brand as={Link} to='/'>
        AOJ/AtCoder-JOI
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Nav className='mr-auto' activeKey={`#${pathname}`}>
          <TopBarLink to='/' title='List' />
          <TopBarLink to='/history' title='History' />
          <TopBarLink to='/links' title='Links' />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
