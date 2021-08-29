import { FC } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'

type Props = {
  loading?: boolean
  disabled?: boolean
}

export const SubmitButton: FC<Props> = (props) => {
  const { loading, children, disabled } = props
  return (
    <Container>
      <Row>
        <Col sm={12} md={{ offset: 9, span: 3 }}>
          <Button type='submit' block disabled={disabled || loading}>
            {children}
          </Button>
        </Col>
      </Row>
    </Container>
  )
}
