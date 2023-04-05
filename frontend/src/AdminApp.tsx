import { Outlet } from 'react-router-dom'
import { ChakraProvider, Container } from '@chakra-ui/react'

export const AdminApp = () => {
  return (
    <ChakraProvider>
      <div>
        <Container maxWidth={'container.xl'}>
          <Outlet />
        </Container>
      </div>
    </ChakraProvider>
  )
}
