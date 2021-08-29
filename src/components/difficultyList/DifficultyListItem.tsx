import { VFC } from 'react'
import { Task } from 'src/types/task'

type Props = {
  task: Task
}

export const DifficultyListItem: VFC<Props> = (props) => {
  const { task } = props
  const { level, name, source, type, aoj } = task

  return (
    <tr>
      <td>{level !== 0 ? level : '?'}</td>
      <td>{name}</td>
      <td>{aoj?.taskId ? '★' : ''}</td>
      <td>{source}</td>
      <td>{type}</td>
    </tr>
  )
}
