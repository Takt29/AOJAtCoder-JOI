import { TableContainer, Table, Thead, Th, Tbody } from '@chakra-ui/react'
import { useChangeLog } from '../../hooks/http/changeLog'
import { ChangeLogItem } from './ChangeLogItem'

export const ChangeLog = () => {
  const { data: changelog } = useChangeLog()

  return (
    <TableContainer>
      <Table size='sm'>
        <Thead>
          <Th>変更前</Th>
          <Th>変更後</Th>
          <Th>問題</Th>
          <Th>更新日</Th>
        </Thead>
        <Tbody>
          {(changelog || []).map((item, i) => (
            <ChangeLogItem key={i} record={item} />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
