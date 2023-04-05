import { Outlet } from 'react-router-dom'
import { ChakraProvider, Container } from '@chakra-ui/react'
import { theme } from './theme'

export const AdminApp = () => {
  return (
    <ChakraProvider theme={theme}>
      <div>
        <Container maxWidth={'container.xl'}>
          <Outlet />
        </Container>
      </div>
    </ChakraProvider>
  )
}
