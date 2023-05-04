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
        textDecoration: 'none',
      }}
      color={isActive ? 'green.500' : undefined}
    >
      {title}
    </InternalLink>
  )
}
