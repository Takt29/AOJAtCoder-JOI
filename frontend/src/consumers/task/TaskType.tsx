import { ElementType, VFC } from 'react'
import { useTask } from '../../hooks/contexts/TaskContext'

type Props = {
  as?: ElementType
  className?: string
}

export const TaskType: VFC<Props> = (props) => {
  const { as: Tag = 'span', className } = props
  const { type } = useTask()

  return <Tag className={className}>{type}</Tag>
}
