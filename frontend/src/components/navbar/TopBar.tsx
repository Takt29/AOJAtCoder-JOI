import { Link as ReactRouterLink } from 'react-router-dom'
import { Box, Flex, HStack, useColorModeValue } from '@chakra-ui/react'
import { TopBarLink } from './TopBarLink'

export const TopBar = () => {
  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} paddingX={8}>
        <Flex h={16} justifyContent={'space-between'}>
          <Flex alignItems={'center'}>
            <HStack>
              <Box
                as={ReactRouterLink}
                to='/'
                _hover={{ textDecoration: 'none' }}
              >
                AOJ/AtCoder-JOI
              </Box>
              <HStack
                as={'nav'}
                spacing={4}
                display={{ base: 'none', md: 'flex' }}
              >
                <TopBarLink to={'/'} title='List' />
                <TopBarLink to={'/history'} title='History' />
                <TopBarLink to={'/changelog'} title='ChangeLog' />
                <TopBarLink to={'/links'} title='Links' />
              </HStack>
            </HStack>
          </Flex>
          <Flex alignItems={'center'}>
            <Box>🇯🇵 / 🇺🇸</Box>
          </Flex>
        </Flex>
      </Box>
    </>
  )
}
