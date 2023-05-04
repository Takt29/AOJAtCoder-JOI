import { Td, Th, Tr } from '@chakra-ui/react'
import { match } from 'ts-pattern'
import { TaskWithResult } from '../../types/task'
import { TaskAizuOnlineJudgeLink } from '../../consumers/task/TaskAizuOnlineJudgeLink'
import { TaskLevel } from '../../consumers/task/TaskLevel'
import { TaskName } from '../../consumers/task/TaskName'
import { TaskSource } from '../../consumers/task/TaskSource'
import { TaskType } from '../../consumers/task/TaskType'
import { TaskProvider } from '../../hooks/contexts/TaskContext'

type Props = {
  task: TaskWithResult
}

export const DifficultyListItem = (props: Props) => {
  const { task } = props

  const backgroundColor = match(task)
    .with(
      {
        result: { isPerfectScore: true },
        rivalResult: { isPerfectScore: true },
      },
      () => '#faddb1',
    )
    .with({ result: { isPerfectScore: true } }, () => '#d7fbd7')
    .with({ rivalResult: { isPerfectScore: true } }, () => '#f8ccc8')
    .otherwise(() => '')

  return (
    <TaskProvider value={task}>
      <Tr backgroundColor={backgroundColor}>
        <TaskLevel as={Th} />
        <TaskName as={Td} />
        <TaskAizuOnlineJudgeLink as={Td} />
        <TaskSource as={Td} />
        <TaskType as={Td} />
      </Tr>
    </TaskProvider>
  )
}
