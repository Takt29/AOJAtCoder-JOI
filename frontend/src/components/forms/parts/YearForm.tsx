import { HStack, Select, Text } from '@chakra-ui/react'
import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'

type Props = {
  title?: string
  name: string
}

export const YearForm = (props: Props) => {
  const { title, name } = props
  const { register } = useFormContext()

  const years = useMemo(() => {
    const minimumYear = 2006
    const maximumYear = new Date().getFullYear()
    return new Array(maximumYear - minimumYear + 1)
      .fill(null)
      .map((_, i) => i + minimumYear)
  }, [])

  return (
    <HStack>
      <Text>{title ?? '年度'}</Text>
      <Select size='sm' {...register(`${name}.begin`)}>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </Select>
      <Text>〜</Text>
      <Select size='sm' {...register(`${name}.end`)}>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
        <option value={9999}></option>
      </Select>
    </HStack>
  )
}
