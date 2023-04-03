import { useMemo, VFC } from 'react'
import { TaskName } from '../../consumers/task/TaskName'
import { TaskProvider } from '../../hooks/contexts/TaskContext'
import { useTasks } from '../../hooks/http/task'
import { ChangeLogRecord } from '../../types/changeLog'
import { ColoredLevel } from '../common/ColoredLevel'
import styles from './ChangeLogItem.module.scss'

type Props = {
  record: ChangeLogRecord
}

export const ChangeLogItem: VFC<Props> = (props) => {
  const { record } = props
  const { data: tasks } = useTasks()

  const task = useMemo(
    () => (tasks || []).find((task) => task.id === record.taskId),
    [record.taskId, tasks],
  )

  if (!task) return null

  return (
    <TaskProvider value={task}>
      <tr>
        <ColoredLevel
          className={styles.level}
          level={record.oldLevel}
          as='td'
        />
        <ColoredLevel
          className={styles.level}
          level={record.newLevel}
          as='td'
        />
        <TaskName as='td' />
        <td>{record.updatedAt}</td>
      </tr>
    </TaskProvider>
  )
}
