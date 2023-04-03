import { VFC } from 'react'
import { Nav } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'

type Props = {
  to: string
  title: string
}

export const TopBarLink: VFC<Props> = (props) => {
  const { to, title } = props
  const { search, pathname } = useLocation()

  return (
    <Nav.Item className={to === pathname ? 'active' : ''}>
      <Nav.Link as={Link} to={{ pathname: to, search: search }}>
        {title}
      </Nav.Link>
    </Nav.Item>
  )
}
