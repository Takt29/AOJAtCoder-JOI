import { Outlet } from 'react-router-dom'
import { ChakraProvider, Container } from '@chakra-ui/react'

export const AdminApp = () => {
  return (
    <ChakraProvider>
      <div>
        <Container>
          <Outlet />
        </Container>
      </div>{' '}
    </ChakraProvider>
  )
}
