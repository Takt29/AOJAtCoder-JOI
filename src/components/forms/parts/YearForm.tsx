import { useMemo, VFC } from 'react'
import { Form, Row, Col } from 'react-bootstrap'
import { useFormContext } from 'react-hook-form'

type Props = {
  title?: string
  name: string
}

export const YearForm: VFC<Props> = (props) => {
  const { title, name } = props
  const { register } = useFormContext()

  const years = useMemo(() => {
    const minimumYear = 2006
    const maximumYear = new Date().getFullYear()
    return new Array(maximumYear - minimumYear + 1)
      .fill(null)
      .map((_, i) => i + minimumYear)
  }, [])

  return (
    <Form.Group as={Row}>
      <Form.Label column sm={2}>
        {title ?? '年度'}
      </Form.Label>
      <Col sm={4}>
        <Form.Control
          as='select'
          size='sm'
          custom
          {...register(`${name}.begin`)}
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </Form.Control>
      </Col>
      <Col sm={1}>〜</Col>
      <Col sm={4}>
        <Form.Control as='select' size='sm' custom {...register(`${name}.end`)}>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
          <option value={9999}></option>
        </Form.Control>
      </Col>
    </Form.Group>
  )
}