import { Box, ChakraComponent } from '@chakra-ui/react'
import { ComponentProps, ElementType } from 'react'

type Props<T extends ElementType, U extends ChakraComponent<T>> = {
  as?: U
  level: number | 'all'
} & Omit<ComponentProps<U>, 'color' | 'backgroundColor'>

export const ColoredLevel = <
  T extends ElementType,
  U extends ChakraComponent<T>,
>(
  props: Props<T, U>,
) => {
  const { as: Tag = Box, level, ...others } = props
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
