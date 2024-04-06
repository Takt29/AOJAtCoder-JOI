import { RenderOptions, render as originalRender } from '@testing-library/react'
import { ReactElement } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { userEvent } from '@testing-library/user-event'
import { theme } from '../theme'

export const render = (
  ui: ReactElement,
  options: Omit<RenderOptions, 'wrapper'> = {},
) => {
  const user = userEvent.setup()

  const renderResult = originalRender(ui, {
    ...options,
    wrapper: (props) => <ChakraProvider {...props} theme={theme} />,
  })

  return { ...renderResult, user }
}
