import { Link as ChakraLink } from '@chakra-ui/react'
import { ComponentProps } from 'react'

type Props = Omit<
  ComponentProps<typeof ChakraLink>,
  'isExternal' | 'target' | 'rel'
> & { noreferrer?: boolean }

export const ExternalLink = (props: Props) => {
  const { noreferrer, ...others } = props
  return (
    <ChakraLink
      target='_blank'
      rel={noreferrer ? 'noopener noreferrer' : 'noopener'}
      {...others}
    />
  )
}
