import { Grid, GridItem, Select, Text } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'
import { valueAsNumberOrUndefined } from '../../../helpers/form'

type Props = {
  title?: string
  name: string
}

const levels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

export const LevelForm = (props: Props) => {
  const { title, name } = props
  const { register } = useFormContext()

  return (
    <Grid templateColumns={'repeat(14, 1fr)'} columnGap={4}>
      <GridItem colSpan={{ md: 2, base: 14 }}>
        <Text>{title ?? '難易度'}</Text>
      </GridItem>
      <GridItem colSpan={{ md: 5, base: 6 }}>
        <Select
          size='sm'
          {...register(`${name}.min`, { setValueAs: valueAsNumberOrUndefined })}
        >
          <option value={''}></option>
          {levels.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </Select>
      </GridItem>
      <GridItem colSpan={{ md: 2, base: 2 }}>
        <Text textAlign={'center'}>〜</Text>
      </GridItem>
      <GridItem colSpan={{ md: 5, base: 6 }}>
        <Select
          size='sm'
          {...register(`${name}.max`, {
            setValueAs: valueAsNumberOrUndefined,
          })}
        >
          <option value={''}></option>
          {levels.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </Select>
      </GridItem>
    </Grid>
  )
}
