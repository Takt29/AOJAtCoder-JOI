import { Checkbox, CheckboxGroup, HStack, Text } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'

type Props = {
  title?: string
  name: string
}

export const HideFilterForm = (props: Props) => {
  const { title, name } = props
  const { register } = useFormContext()

  return (
    <HStack>
      <Text>{title ?? 'フィルタ'}</Text>
      <CheckboxGroup>
        <HStack>
          {[
            ['solvedTask', 'ACした問題を非表示'],
            ['notExistTask', 'Judge未存在問題を非表示'],
            ['level', '難易度を非表示'],
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
