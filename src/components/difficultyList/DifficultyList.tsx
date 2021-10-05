import { useMemo, VFC } from 'react'
import { Table } from 'react-bootstrap'
import { DifficultyListItem } from './DifficultyListItem'
import { useTasks } from '../../hooks/http/task'
import { useSubmissions } from '../../hooks/http/submissions'
import styles from './DifficultyList.module.scss'
import { mergeTaskAndSubmissions } from '../../helpers/submission'
import { TaskFilter } from '../../types/task'
import { AccountData } from '../../types/form'
import { filterTask } from '../../helpers/task'

type Props = {
  myAccount?: AccountData
  rivalAccount?: AccountData
  taskFilter?: TaskFilter
}

export const DifficultyList: VFC<Props> = (props) => {
  const { myAccount, rivalAccount, taskFilter } = props

  const { data: tasks } = useTasks()

  const { data: submissions } = useSubmissions(
    myAccount?.atcoder,
    myAccount?.aoj,
  )
  const { data: rivalSubmissions } = useSubmissions(
    rivalAccount?.atcoder,
    rivalAccount?.aoj,
  )

  const filteredTasks = useMemo(
    () => (taskFilter ? filterTask(tasks || [], taskFilter) : tasks || []),
    [tasks, taskFilter],
  )

  const tasksWithResult = useMemo(() => {
    const A = mergeTaskAndSubmissions(filteredTasks, submissions || [])
    const B = mergeTaskAndSubmissions(A, rivalSubmissions || [], true)
    return B
  }, [rivalSubmissions, submissions, filteredTasks])

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
