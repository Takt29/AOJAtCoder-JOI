import { Heading } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { ExternalLink } from '../common/ExternalLink'

type Props = {
  children: ReactNode
  title: string
  href: string
}

export const LinksPageComponent = (props: Props) => {
  const { title, href, children } = props

  return (
    <div>
      <Heading as='h4' size='md'>
        <ExternalLink href={href}>{title}</ExternalLink>
      </Heading>
      <p>{children}</p>
    </div>
  )
}
