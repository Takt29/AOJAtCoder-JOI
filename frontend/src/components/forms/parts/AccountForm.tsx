import {
  Text,
  InputGroup,
  InputLeftAddon,
  Input,
  Grid,
  GridItem,
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
    <Grid templateColumns={{ md: 'repeat(14, 1fr)' }} columnGap={4} rowGap={2}>
      <GridItem colSpan={{ md: 2, base: 1 }}>
        <Text>{title ?? 'アカウント'}</Text>
      </GridItem>
      <GridItem colSpan={{ md: 6, base: 1 }}>
        <InputGroup size={'sm'}>
          <InputLeftAddon>AtCoder</InputLeftAddon>
          <Input {...register(`${name}.atcoder`)} placeholder='AtCoder ID' />
        </InputGroup>
      </GridItem>
      <GridItem colSpan={{ md: 6, base: 1 }}>
        <InputGroup size={'sm'}>
          <InputLeftAddon>AOJ</InputLeftAddon>
          <Input {...register(`${name}.aoj`)} placeholder='AOJ ID' />
        </InputGroup>
      </GridItem>
    </Grid>
  )
}
