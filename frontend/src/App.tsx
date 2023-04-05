import { ChakraProvider, Container } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import { TopBar } from './components/navbar/TopBar'
import { theme } from './theme'

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <div>
        <TopBar />
        <Container maxWidth={'container.xl'}>
          <Outlet />
        </Container>
      </div>
    </ChakraProvider>
  )
}
