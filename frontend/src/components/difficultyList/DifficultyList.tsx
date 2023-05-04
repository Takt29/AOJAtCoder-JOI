import { useMemo } from 'react'
import { Table, TableContainer, Tbody, Thead, Tr, Th } from '@chakra-ui/react'
import { DifficultyListItem } from './DifficultyListItem'
import { useTasks } from '../../hooks/http/task'
import { mergeTaskAndSubmissions } from '../../helpers/submission'
import { TaskFilter } from '../../types/task'
import { filterTask } from '../../helpers/task'
import { Submission } from '../../types/submission'

type Props = {
  submissions?: Submission[]
  rivalSubmissions?: Submission[]
  taskFilter?: TaskFilter
}

export const DifficultyList = (props: Props) => {
  const { submissions, rivalSubmissions, taskFilter } = props

  const { data: tasks } = useTasks()

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
    <TableContainer>
      <Table size='sm'>
        <Thead>
          <Tr>
            <Th>難易度</Th>
            <Th>問題名(AtCoder)</Th>
            <Th>AOJ</Th>
            <Th>出典</Th>
            <Th>問題タイプ</Th>
          </Tr>
        </Thead>
        <Tbody>
          {(tasksWithResult || []).map((task) => (
            <DifficultyListItem key={task.id} task={task} />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
