import { Button } from '@chakra-ui/react'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
  loading?: boolean
  disabled?: boolean
}

export const SubmitButton = (props: Props) => {
  const { loading, children, disabled } = props
  return (
    <Button type='submit' disabled={disabled || loading}>
      {children}
    </Button>
  )
}
