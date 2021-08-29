import { VFC } from 'react'
import { Form, Row, Col } from 'react-bootstrap'
import { useFormContext } from 'react-hook-form'

type Props = {
  title?: string
  name: string
}

export const ContestTypeForm: VFC<Props> = (props) => {
  const { title, name } = props
  const { register } = useFormContext()

  return (
    <Form.Group as={Row}>
      <Form.Label column sm={2}>
        {title || '大会タイプ'}
      </Form.Label>
      <Col sm={10}>
        <Row>
          <Col sm={4}>
            <Form.Check
              id={`${name}.prelim1`}
              type='checkbox'
              label='一次予選'
              custom
              {...register(`${name}.prelim1`)}
            />
          </Col>
          <Col sm={4}>
            <Form.Check
              id={`${name}.prelim2`}
              type='checkbox'
              label='二次予選(旧予選)'
              custom
              {...register(`${name}.prelim2`)}
            />
          </Col>
          <Col sm={4}>
            <Form.Check
              id={`${name}.final`}
              type='checkbox'
              label='本選'
              custom
              {...register(`${name}.final`)}
            />
          </Col>
        </Row>
        <Row>
          <Col sm={4}>
            <Form.Check
              id={`${name}.springCamp`}
              type='checkbox'
              label='春合宿'
              custom
              {...register(`${name}.springCamp`)}
            />
          </Col>
          <Col sm={4}>
            <Form.Check
              id={`${name}.joig`}
              type='checkbox'
              label='JOIG'
              custom
              {...register(`${name}.joig`)}
            />
          </Col>
          <Col sm={4}>
            <Form.Check
              id={`${name}.open`}
              type='checkbox'
              label='Open'
              custom
              {...register(`${name}.open`)}
            />
          </Col>
        </Row>
      </Col>
    </Form.Group>
  )
}
