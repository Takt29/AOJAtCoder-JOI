import { VFC } from 'react'
import { Form, Row, Col } from 'react-bootstrap'
import { useFormContext } from 'react-hook-form'

type Props = {
  title?: string
  name: string
}

export const TaskTypeForm: VFC<Props> = (props) => {
  const { title, name } = props
  const { register } = useFormContext()

  return (
    <Form.Group as={Row}>
      <Form.Label column sm={2}>
        {title ?? '問題タイプ'}
      </Form.Label>
      <Col sm={3}>
        <Form.Check
          id={`${name}.batch`}
          type='checkbox'
          label='Batch'
          custom
          {...register(`${name}.batch`)}
        />
      </Col>
      <Col sm={3}>
        <Form.Check
          type='checkbox'
          id={`${name}.communication`}
          label='Communication'
          custom
          {...register(`${name}.communication`)}
        />
      </Col>
      <Col sm={3}>
        <Form.Check
          id={`${name}.outputOnly`}
          type='checkbox'
          label='OutputOnly'
          custom
          {...register(`${name}.outputOnly`)}
        />
      </Col>
    </Form.Group>
  )
}
