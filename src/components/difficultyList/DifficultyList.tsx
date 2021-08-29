import { useMemo, VFC } from 'react'
import { Table } from 'react-bootstrap'
import { DifficultyListItem } from './DifficultyListItem'
import { useTasks } from '../../hooks/http/task'
import { useSubmissions } from '../../hooks/http/submissions'
import styles from './DifficultyList.module.scss'
import { mergeTaskAndSubmissions } from '../../helpers/submission'

export const DifficultyList: VFC = () => {
  const { data: tasks } = useTasks()
  const { data: submissions } = useSubmissions('goodbaton', 'TKT29')

  const tasksWithResult = useMemo(
    () => tasks && submissions && mergeTaskAndSubmissions(tasks, submissions),
    [submissions, tasks],
  )

  console.log(tasksWithResult)

  return (
    <Table className={styles.root} size='sm' responsive>
      <thead>
        <tr>
          <th>難易度</th>
          <th>問題名(AtCoder)</th>
          <th>AOJ</th>
          <th>出典</th>
          <th>問題タイプ</th>
        </tr>
      </thead>
      <tbody>
        {(tasksWithResult || []).map((task) => (
          <DifficultyListItem key={task.id} task={task} />
        ))}
      </tbody>
    </Table>
  )
}
