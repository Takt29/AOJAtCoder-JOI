import { VFC } from 'react'
import { Col, Form, InputGroup, Row } from 'react-bootstrap'
import { useFormContext } from 'react-hook-form'

type Props = {
  title?: string
  name: string
}

export const AccountForm: VFC<Props> = (props) => {
  const { title, name } = props
  const { register } = useFormContext()

  return (
    <Form.Group as={Row}>
      <Form.Label column sm={2}>
        {title ?? 'アカウント'}
      </Form.Label>
      <Col sm={5}>
        <InputGroup size='sm' className={'sm-3'}>
          <InputGroup.Prepend>
            <InputGroup.Text>AtCoder</InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control
            {...register(`${name}.atcoder`)}
            placeholder='AtCoder ID'
          />
        </InputGroup>
      </Col>
      <Col sm={5}>
        <InputGroup size='sm' className={'sm-3'}>
          <InputGroup.Prepend>
            <InputGroup.Text>AOJ</InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control {...register(`${name}.aoj`)} placeholder='AOJ ID' />
        </InputGroup>
      </Col>
    </Form.Group>
  )
}
