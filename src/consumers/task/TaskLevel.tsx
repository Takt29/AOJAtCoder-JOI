import { ElementType, VFC } from 'react'
import { ColoredLevel } from '../../components/common/ColoredLevel'
import { useTask } from '../../hooks/contexts/TaskContext'

type Props = {
  as?: ElementType
  className?: string
}

export const TaskLevel: VFC<Props> = (props) => {
  const { as, className } = props
  const { level } = useTask()

  return <ColoredLevel as={as} className={className} level={level} />
}
