import { ElementType, VFC } from 'react'
import { useTask } from '../../hooks/contexts/TaskContext'

type Props = {
  as?: ElementType
  className?: string
}

export const TaskLevel: VFC<Props> = (props) => {
  const { as: Tag = 'span', className } = props
  const { level } = useTask()

  return <Tag className={className}>{level !== 0 ? level : '?'}</Tag>
}
