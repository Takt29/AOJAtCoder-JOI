import { Box, Button } from '@chakra-ui/react'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
  loading?: boolean
  disabled?: boolean
}

export const SubmitButton = (props: Props) => {
  const { loading = false, children, disabled } = props
  return (
    <Box textAlign={'right'}>
      <Button
        type='submit'
        disabled={disabled || loading}
        isLoading={loading}
        width={{ md: 64, base: '100%' }}
      >
        {children}
      </Button>
    </Box>
  )
}
