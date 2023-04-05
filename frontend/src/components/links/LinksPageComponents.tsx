import { Heading } from '@chakra-ui/react'
import { ReactNode } from 'react'

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
        <a href={href} target='_blank' rel='noopener noreferrer'>
          {title}
        </a>
      </Heading>
      <p>{children}</p>
    </div>
  )
}
