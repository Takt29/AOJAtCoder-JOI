import { Link } from '@chakra-ui/react'
import {
  Link as ReactRouterLink,
  useLocation,
  useMatch,
} from 'react-router-dom'

type Props = {
  to: string
  title: string
}

export const TopBarLink = (props: Props) => {
  const { to, title } = props
  const { search } = useLocation()
  const isActive = !!useMatch(to)

  return (
    <Link
      paddingX={2}
      paddingY={1}
      as={ReactRouterLink}
      to={{ pathname: to, search: search }}
      _hover={{
        textDecoration: 'none',
      }}
      color={isActive ? 'green.500' : undefined}
    >
      {title}
    </Link>
  )
}
