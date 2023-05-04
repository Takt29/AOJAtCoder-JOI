import { ComponentProps, ElementType } from 'react'

type Props<T extends ElementType> = {
  as?: T
  level: number | 'all'
} & Omit<ComponentProps<T>, 'color' | 'backgroundColor'>

export const ColoredLevel = <T extends ElementType>(props: Props<T>) => {
  const { as: Tag = 'span', level, ...others } = props
  return (
    <Tag
      color={`level-text.${level}`}
      backgroundColor={`level-background.${level}`}
      {...others}
    >
      {level !== 0 ? level : '?'}
    </Tag>
  )
}
