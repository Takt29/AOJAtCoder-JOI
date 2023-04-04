import { Td, Tr } from '@chakra-ui/react'
import { useMemo } from 'react'
import { TaskName } from '../../consumers/task/TaskName'
import { TaskProvider } from '../../hooks/contexts/TaskContext'
import { useTasks } from '../../hooks/http/task'
import { ChangeLogRecord } from '../../types/changeLog'
import { ColoredLevel } from '../common/ColoredLevel'
import styles from './ChangeLogItem.module.scss'

type Props = {
  record: ChangeLogRecord
}

export const ChangeLogItem = (props: Props) => {
  const { record } = props
  const { data: tasks } = useTasks()

  const task = useMemo(
    () => (tasks || []).find((task) => task.id === record.taskId),
    [record.taskId, tasks],
  )

  if (!task) return null

  return (
    <TaskProvider value={task}>
      <Tr>
        <ColoredLevel
          className={styles.level}
          level={record.oldLevel}
          as={Td}
        />
        <ColoredLevel
          className={styles.level}
          level={record.newLevel}
          as={Td}
        />
        <TaskName as={Td} />
        <Td>{record.updatedAt}</Td>
      </Tr>
    </TaskProvider>
  )
}
