import { ChakraProvider, Container } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import { TopBar } from './components/navbar/TopBar'

export const App = () => {
  return (
    <ChakraProvider>
      <div>
        <TopBar />
        <Container maxWidth={'container.xl'}>
          <Outlet />
        </Container>
      </div>
    </ChakraProvider>
  )
}
