import { ElementType } from 'react'
import { useTask } from '../../hooks/contexts/TaskContext'

type Props = {
  as?: ElementType
  className?: string
}

export const TaskSource = (props: Props) => {
  const { as: Tag = 'span', className } = props
  const { source } = useTask()

  return <Tag className={className}>{source}</Tag>
}
