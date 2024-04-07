import { Checkbox, CheckboxGroup, Grid, GridItem, Text } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'

type Props = {
  title?: string
  name: string
}

export const ContestTypeForm = (props: Props) => {
  const { title, name } = props
  const { register } = useFormContext()

  return (
    <Grid templateColumns={{ md: 'repeat(14, 1fr)' }} columnGap={4}>
      <GridItem colSpan={{ md: 2, base: 1 }}>
        <Text>{title || '大会タイプ'}</Text>
      </GridItem>
      <GridItem colSpan={{ md: 12, base: 1 }}>
        <CheckboxGroup>
          <Grid templateColumns={{ md: 'repeat(12, 1fr)' }} columnGap={4}>
            {[
              ['prelim1', '一次予選'],
              ['prelim2', '二次予選(旧予選)'],
              ['final', '本選'],
              ['spring', '春トレ(旧春合宿)'],
              ['joig', 'JOIG本選'],
              ['joigSpring', 'JOIG春トレ'],
              ['open', 'Open'],
            ].map(([subId, label]) => (
              <GridItem key={subId} colSpan={{ lg: 3, md: 4, sm: 6, base: 1 }}>
                <Checkbox
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
