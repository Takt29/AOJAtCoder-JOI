import clsx from 'clsx'
import { VFC } from 'react'
import { Task } from 'src/types/task'
import { TaskAizuOnlineJudgeLink } from '../../consumers/task/TaskAizuOnlineJudgeLink'
import { TaskLevel } from '../../consumers/task/TaskLevel'
import { TaskName } from '../../consumers/task/TaskName'
import { TaskSource } from '../../consumers/task/TaskSource'
import { TaskType } from '../../consumers/task/TaskType'
import { TaskProvider } from '../../hooks/contexts/TaskContext'
import styles from './DifficultyListItem.module.scss'

type Props = {
  task: Task
}

export const DifficultyListItem: VFC<Props> = (props) => {
  const { task } = props
  const { level } = task

  return (
    <TaskProvider value={task}>
      <tr>
        <TaskLevel as='th' className={clsx(`level-${level}`, styles.level)} />
        <TaskName as='td' />
        <TaskAizuOnlineJudgeLink as='td' className={styles.aoj} />
        <TaskSource as='td' />
        <TaskType as='td' />
      </tr>
    </TaskProvider>
  )
}
