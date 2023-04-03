import { ElementType, VFC } from 'react'
import { useTask } from '../../hooks/contexts/TaskContext'

type Props = {
  as?: ElementType
  className?: string
}

export const TaskSource: VFC<Props> = (props) => {
  const { as: Tag = 'span', className } = props
  const { source } = useTask()

  return <Tag className={className}>{source}</Tag>
}
