import { ComponentProps, ElementType } from 'react'
import { ColoredLevel } from '../../components/common/ColoredLevel'
import { useTask } from '../../hooks/contexts/TaskContext'

type Props<T extends ElementType> = {
  as?: T
} & ComponentProps<T>

export const TaskLevel = <T extends ElementType>(props: Props<T>) => {
  const { as, ...others } = props
  const { level } = useTask()

  return <ColoredLevel as={as} {...others} level={level} />
}
