import { VFC } from 'react'
import { Table } from 'react-bootstrap'
import { DifficultyListItem } from './DifficultyListItem'
import { useTasks } from '../../hooks/http/task'
import { useSubmissions } from '../../hooks/http/submissions'

export const DifficultyList: VFC = () => {
  const { data: tasks } = useTasks()
  const { data: submissions } = useSubmissions('goodbaton', 'TKT29')

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
