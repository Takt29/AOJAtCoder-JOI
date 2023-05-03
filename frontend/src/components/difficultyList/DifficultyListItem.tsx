import { Td, Th, Tr } from '@chakra-ui/react'
import clsx from 'clsx'
import { TaskWithResult } from '../../types/task'
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

export const DifficultyListItem = (props: Props) => {
  const { task } = props
  const {
    result: { isPerfectScore: solved } = {},
    rivalResult: { isPerfectScore: solvedByRival } = {},
  } = task

  return (
    <TaskProvider value={task}>
      <Tr
        className={clsx({
          [styles.solved]: solved,
          [styles.solvedByRival]: solvedByRival,
        })}
      >
        <TaskLevel as={Th} className={styles.level} />
        <TaskName as={Td} />
        <TaskAizuOnlineJudgeLink as={Td} className={styles.aoj} />
        <TaskSource as={Td} />
        <TaskType as={Td} />
      </Tr>
    </TaskProvider>
  )
}
