import clsx from 'clsx'
import { ElementType } from 'react'

type Props = {
  as?: ElementType
  level: number | 'ALL'
  className?: string
}

export const ColoredLevel = (props: Props) => {
  const { as: Tag = 'span', className, level } = props
  return (
    <Tag className={clsx(`level-${level}`, className)}>
      {level !== 0 ? level : '?'}
    </Tag>
  )
}
