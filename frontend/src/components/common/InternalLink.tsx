import { Link as ChakraLink } from '@chakra-ui/react'
import { ComponentProps } from 'react'
import { Link as ReactRouterLink } from 'react-router-dom'

type Props = Omit<
  ComponentProps<typeof ChakraLink>,
  'href' | 'as' | 'isExternal'
> &
  ComponentProps<typeof ReactRouterLink>

export const InternalLink = (props: Props) => {
  return <ChakraLink as={ReactRouterLink} isExternal={false} {...props} />
}
