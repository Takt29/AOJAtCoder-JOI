import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  components: {
    Heading: {
      baseStyle: {
        color: 'red.600',
        borderBottom: '2px',
        borderBottomColor: 'blue.600',
      },
    },
  },
})
