import clsx from 'clsx'
import { VFC } from 'react'
import { Task } from 'src/types/task'
import styles from './DifficultyListItem.module.scss'

type Props = {
  task: Task
}

export const DifficultyListItem: VFC<Props> = (props) => {
  const { task } = props
  const { level, name, source, type, aoj } = task

  return (
    <tr>
      <th className={clsx(`level-${level}`, styles.level)}>
        {level !== 0 ? level : '?'}
      </th>
      <td>{name}</td>
      <td className={styles.aoj}>{aoj?.taskId ? '★' : ''}</td>
      <td>{source}</td>
      <td>{type}</td>
    </tr>
  )
}
