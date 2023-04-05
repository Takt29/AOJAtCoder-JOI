import {
  HStack,
  Text,
  InputGroup,
  InputLeftAddon,
  Input,
} from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'

type Props = {
  title?: string
  name: string
}

export const AccountForm = (props: Props) => {
  const { title, name } = props
  const { register } = useFormContext()

  return (
    <HStack spacing={4}>
      <Text>{title ?? 'アカウント'}</Text>
      <InputGroup>
        <InputLeftAddon>AtCoder</InputLeftAddon>
        <Input {...register(`${name}.atcoder`)} placeholder='AtCoder ID' />
      </InputGroup>
      <InputGroup>
        <InputLeftAddon>AOJ</InputLeftAddon>
        <Input {...register(`${name}.aoj`)} placeholder='AOJ ID' />
      </InputGroup>
    </HStack>
  )
}
