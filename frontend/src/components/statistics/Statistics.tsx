import { Box, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { useMemo } from 'react'
import { ColoredLevel } from '../common/ColoredLevel'

export const Statistics = () => {
  const levels: (number | 'all')[] = useMemo(
    () => [...new Array(12).fill(null).map((_, i) => i + 1), 0, 'all'],
    [],
  )

  return (
    <Box overflowY={'scroll'}>
      <Table size='sm'>
        <Thead>
          <Tr>
            {levels.map((level) => (
              <ColoredLevel key={level} as={Th} level={level} />
            ))}
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            {levels.map((level) => (
              <Td key={level} textAlign={'center'} minWidth={16}>
                {'0 / 0'}
              </Td>
            ))}
          </Tr>
          <Tr>
            {levels.map((level) => (
              <Td key={level} textAlign={'center'} minWidth={16}>
                {'0 %'}
              </Td>
            ))}
          </Tr>
        </Tbody>
      </Table>
    </Box>
  )
}
