import { Form, Row, Col } from 'react-bootstrap'
import { useFormContext } from 'react-hook-form'

type Props = {
  title?: string
  name: string
}

export const TaskTypeForm = (props: Props) => {
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
          {...register(`${name}.batch`)}
        />
      </Col>
      <Col sm={3}>
        <Form.Check
          type='checkbox'
          id={`${name}.communication`}
          label='Communication'
          {...register(`${name}.communication`)}
        />
      </Col>
      <Col sm={3}>
        <Form.Check
          id={`${name}.outputOnly`}
          type='checkbox'
          label='OutputOnly'
          {...register(`${name}.outputOnly`)}
        />
      </Col>
    </Form.Group>
  )
}
