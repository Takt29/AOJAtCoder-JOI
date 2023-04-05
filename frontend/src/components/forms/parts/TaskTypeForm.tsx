import { Checkbox, CheckboxGroup, HStack, Text } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'

type Props = {
  title?: string
  name: string
}

export const TaskTypeForm = (props: Props) => {
  const { title, name } = props
  const { register } = useFormContext()

  return (
    <HStack>
      <Text>{title ?? '問題タイプ'}</Text>
      <CheckboxGroup>
        <HStack>
          {[
            ['batch', 'Batch'],
            ['communication', 'Communication'],
            ['outputOnly', 'OutputOnly'],
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
