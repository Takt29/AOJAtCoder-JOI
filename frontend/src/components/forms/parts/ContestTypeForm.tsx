import { Checkbox, CheckboxGroup, HStack, Text } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'

type Props = {
  title?: string
  name: string
}

export const ContestTypeForm = (props: Props) => {
  const { title, name } = props
  const { register } = useFormContext()

  return (
    <HStack>
      <Text>{title || '大会タイプ'}</Text>
      <CheckboxGroup>
        <HStack>
          {[
            ['prelim1', '一次予選'],
            ['prelim2', '二次予選(旧予選)'],
            ['final', '本選'],
            ['springCamp', '春合宿'],
            ['open', 'Open'],
            ['joig', 'JOIG'],
            ['joigSpring', 'JOIG春合宿'],
          ].map(([subId, label]) => (
            <Checkbox
              key={subId}
              id={`${name}.${subId}`}
              type='checkbox'
              {...register(`${name}.${subId}`)}
            >
              {label}
            </Checkbox>
          ))}
        </HStack>
      </CheckboxGroup>
    </HStack>
  )
}
