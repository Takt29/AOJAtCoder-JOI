import { VFC } from 'react'
import { Form, Row, Col } from 'react-bootstrap'
import { useFormContext } from 'react-hook-form'

type Props = {
  title?: string
  name: string
}

export const HideFilterForm: VFC<Props> = (props) => {
  const { title, name } = props
  const { register } = useFormContext()

  return (
    <Form.Group as={Row}>
      <Form.Label column sm={2}>
        {title ?? 'フィルタ'}
      </Form.Label>
      <Col sm={3}>
        <Form.Check
          id={`${name}.solvedTask`}
          type='checkbox'
          label='ACした問題を非表示'
          {...register(`${name}.solvedTask`)}
        />
      </Col>
      <Col sm={3}>
        <Form.Check
          id={`${name}.notExistTask`}
          type='checkbox'
          label='Judge未存在問題を非表示'
          {...register(`${name}.notExistTask`)}
        />
      </Col>
      <Col sm={3}>
        <Form.Check
          id={`${name}.level`}
          type='checkbox'
          label='難易度を非表示'
          {...register(`${name}.level`)}
        />
      </Col>
    </Form.Group>
  )
}
