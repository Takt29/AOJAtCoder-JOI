import { extendTheme } from '@chakra-ui/react'
import { LevelColors } from './constants/LevelColors'

export const theme = extendTheme({
  components: {
    Heading: {
      baseStyle: {
        color: 'red.600',
        borderBottom: '2px',
        borderBottomColor: 'blue.600',
      },
    },
    Table: {
      baseStyle: {
        th: {
          textAlign: 'center',
          whiteSpace: 'nowrap',
        },
        td: {
          whiteSpace: 'nowrap',
        },
      },
    },
  },
  colors: {
    'level-text': Object.fromEntries(
      Object.entries(LevelColors).map(([key, { text }]) => [key, text]),
    ),
    'level-background': Object.fromEntries(
      Object.entries(LevelColors).map(([key, { background }]) => [
        key,
        background,
      ]),
    ),
  },
})
