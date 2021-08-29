import { VFC } from 'react'
import { Table } from 'react-bootstrap'
import { fetchTasks } from '../../repositories/task'
import useSWRImmutable from 'swr/immutable'
import { DifficultyListItem } from './DifficultyListItem'

export const DifficultyList: VFC = () => {
  const { data: { data: tasks } = {} } = useSWRImmutable('fetchTasks', () =>
    fetchTasks(),
  )

  return (
    <Table size='sm' responsive>
      <thead>
        <tr>
          <th>Level</th>
          <th>問題名(AtCoder)</th>
          <th>AOJ</th>
          <th>出典</th>
          <th>問題タイプ</th>
        </tr>
      </thead>
      <tbody>
        {(tasks || []).map((task) => (
          <DifficultyListItem key={task.id} task={task} />
        ))}
      </tbody>
    </Table>
  )
}
