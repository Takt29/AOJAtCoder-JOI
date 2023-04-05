import { Checkbox, CheckboxGroup, Grid, GridItem, Text } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'

type Props = {
  title?: string
  name: string
}

export const HideFilterForm = (props: Props) => {
  const { title, name } = props
  const { register } = useFormContext()

  return (
    <Grid templateColumns={{ md: 'repeat(14, 1fr)' }} columnGap={4}>
      <GridItem colSpan={{ md: 2, base: 1 }}>
        <Text>{title ?? 'フィルタ'}</Text>
      </GridItem>
      <GridItem colSpan={{ md: 12, base: 1 }}>
        <CheckboxGroup>
          <Grid templateColumns={{ md: 'repeat(12, 1fr)' }} columnGap={4}>
            {[
              ['solvedTask', 'ACした問題を非表示'],
              ['notExistTask', 'Judge未存在問題を非表示'],
              ['level', '難易度を非表示'],
            ].map(([subId, label]) => (
              <GridItem key={subId} colSpan={{ lg: 3, md: 4, sm: 6, base: 1 }}>
                <Checkbox
                  key={subId}
                  id={`${name}.${subId}`}
                  type='checkbox'
                  {...register(`${name}.${subId}`)}
                >
                  {label}
                </Checkbox>
              </GridItem>
            ))}
          </Grid>
        </CheckboxGroup>
      </GridItem>
    </Grid>
  )
}
