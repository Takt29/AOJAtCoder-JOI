import { ReactNode } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'

type Props = {
  children: ReactNode
  loading?: boolean
  disabled?: boolean
}

export const SubmitButton = (props: Props) => {
  const { loading, children, disabled } = props
  return (
    <Container>
      <Row>
        <Col sm={12} md={{ offset: 9, span: 3 }}>
          <Button type='submit' disabled={disabled || loading}>
            {children}
          </Button>
        </Col>
      </Row>
    </Container>
  )
}
