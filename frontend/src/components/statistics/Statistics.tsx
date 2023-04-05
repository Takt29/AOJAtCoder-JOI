import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { useMemo } from 'react'
import { ColoredLevel } from '../common/ColoredLevel'
import styles from './Statistics.module.scss'

export const Statistics = () => {
  const levels: (number | 'ALL')[] = useMemo(
    () => [...new Array(12).fill(null).map((_, i) => i + 1), 0, 'ALL'],
    [],
  )

  return (
    <div className={styles.root}>
      <Table className={styles.table} size='sm'>
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
              <Td key={level}>{'0 / 0'}</Td>
            ))}
          </Tr>
          <Tr>
            {levels.map((level) => (
              <Td key={level}>{'0 %'}</Td>
            ))}
          </Tr>
        </Tbody>
      </Table>
    </div>
  )
}
