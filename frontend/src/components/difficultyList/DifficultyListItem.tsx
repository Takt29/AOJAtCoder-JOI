import clsx from 'clsx'
import { VFC } from 'react'
import { Task, TaskWithResult } from 'src/types/task'
import { TaskAizuOnlineJudgeLink } from '../../consumers/task/TaskAizuOnlineJudgeLink'
import { TaskLevel } from '../../consumers/task/TaskLevel'
import { TaskName } from '../../consumers/task/TaskName'
import { TaskSource } from '../../consumers/task/TaskSource'
import { TaskType } from '../../consumers/task/TaskType'
import { TaskProvider } from '../../hooks/contexts/TaskContext'
import styles from './DifficultyListItem.module.scss'

type Props = {
  task: TaskWithResult
}

export const DifficultyListItem: VFC<Props> = (props) => {
  const { task } = props
  const {
    result: { isPerfectScore: solved } = {},
    rivalResult: { isPerfectScore: solvedByRival } = {},
  } = task

  return (
    <TaskProvider value={task}>
      <tr
        className={clsx({
          [styles.solved]: solved,
          [styles.solvedByRival]: solvedByRival,
        })}
      >
        <TaskLevel as='th' className={styles.level} />
        <TaskName as='td' />
        <TaskAizuOnlineJudgeLink as='td' className={styles.aoj} />
        <TaskSource as='td' />
        <TaskType as='td' />
      </tr>
    </TaskProvider>
  )
}
