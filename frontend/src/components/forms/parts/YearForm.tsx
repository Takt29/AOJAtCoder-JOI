import { Grid, GridItem, Select, Text } from '@chakra-ui/react'
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
    // 次の年度が開始する頃(9月)からは翌年も表示する
    const currentYear = new Date().getFullYear()
    const maximumYear =
      new Date().getMonth() + 1 >= 9 ? currentYear + 1 : currentYear

    return new Array(maximumYear - minimumYear + 1)
      .fill(null)
      .map((_, i) => i + minimumYear)
  }, [])

  return (
    <Grid templateColumns={'repeat(14, 1fr)'} columnGap={4}>
      <GridItem colSpan={{ md: 2, base: 14 }}>
        <Text>{title ?? '年度'}</Text>
      </GridItem>
      <GridItem colSpan={{ md: 5, base: 6 }}>
        <Select size='sm' {...register(`${name}.begin`)}>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </Select>
      </GridItem>
      <GridItem colSpan={{ md: 2, base: 2 }}>
        <Text textAlign={'center'}>〜</Text>
      </GridItem>
      <GridItem colSpan={{ md: 5, base: 6 }}>
        <Select size='sm' {...register(`${name}.end`)}>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
          <option value={9999}></option>
        </Select>
      </GridItem>
    </Grid>
  )
}
