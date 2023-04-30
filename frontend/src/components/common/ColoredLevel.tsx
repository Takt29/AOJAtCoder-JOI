import { ElementType } from 'react'

type Props = {
  as?: ElementType
  level: number | 'all'
  className?: string
}

export const ColoredLevel = (props: Props) => {
  const { as: Tag = 'span', className, level } = props
  return (
    <Tag
      className={className}
      color={`level-text.${level}`}
      backgroundColor={`level-background.${level}`}
    >
      {level !== 0 ? level : '?'}
    </Tag>
  )
}
