import {
  Box,
  Collapse,
  Flex,
  HStack,
  IconButton,
  Stack,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import { InternalLink } from '../common/InternalLink'
import { TopBarLink } from './TopBarLink'

export const TopBar = () => {
  const isMobile = useBreakpointValue({ base: true, md: false })
  const { isOpen, onToggle } = useDisclosure()

  return (
    <>
      <Box bg={'gray.100'}>
        <Flex
          height={16}
          align={'center'}
          borderBottom={1}
          borderStyle={'solid'}
          borderColor={'gray.200'}
          paddingX={4}
        >
          <Flex
            flex={{ base: 1 }}
            display={isMobile ? 'flex' : 'none'}
            ml={{ base: -2 }}
          >
            <IconButton
              onClick={onToggle}
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label={isOpen ? 'open navigation' : 'close navigation'}
              variant={'ghost'}
            />
          </Flex>
          <Flex
            flex={{ base: 2, md: 'none' }}
            justifyContent={{ base: 'center', md: 'left' }}
          >
            <InternalLink
              to='/'
              _hover={{ textDecoration: 'none' }}
              textAlign={{ base: 'center', md: 'left' }}
              verticalAlign={'center'}
              whiteSpace={'nowrap'}
            >
              AOJ/AtCoder-JOI
            </InternalLink>
          </Flex>
          <Flex
            flex={{ base: 'none', md: 'auto' }}
            display={isMobile ? 'none' : 'flex'}
          >
            <HStack as={'nav'} spacing={4} marginLeft={8}>
              <TopBarLink to={'/'} title='List' />
              <TopBarLink to={'/history'} title='History' />
              <TopBarLink to={'/changelog'} title='ChangeLog' />
              <TopBarLink to={'/links'} title='Links' />
            </HStack>
          </Flex>
          <Box
            flex={{ base: 1, md: 0 }}
            justifyContent={'flex-end'}
            textAlign={'right'}
            whiteSpace={'nowrap'}
          >
            🇯🇵 / 🇺🇸
          </Box>
        </Flex>

        <Collapse in={isOpen} animateOpacity>
          <Stack as={'nav'} spacing={2} padding={2}>
            <TopBarLink to={'/'} title='List' />
            <TopBarLink to={'/history'} title='History' />
            <TopBarLink to={'/changelog'} title='ChangeLog' />
            <TopBarLink to={'/links'} title='Links' />
          </Stack>
        </Collapse>
      </Box>
    </>
  )
}
