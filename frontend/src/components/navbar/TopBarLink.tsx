import { useLocation, useMatch } from 'react-router-dom'
import { InternalLink } from '../common/InternalLink'

type Props = {
  to: string
  title: string
}

export const TopBarLink = (props: Props) => {
  const { to, title } = props
  const { search } = useLocation()
  const isActive = !!useMatch(to)

  return (
    <InternalLink
      paddingX={2}
      paddingY={1}
      to={{ pathname: to, search: search }}
      _hover={{
        color: 'green.700',
        borderBottom: 'solid',
        borderBottomWidth: 1,
        textDecoration: 'none',
      }}
      aria-current={isActive ? 'page' : undefined}
      _activeLink={{
        color: 'green.500',
        borderBottom: 'solid',
        borderBottomWidth: 1,
      }}
      boxSizing='border-box'
      height={8}
    >
      {title}
    </InternalLink>
  )
}
