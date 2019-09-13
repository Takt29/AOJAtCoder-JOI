import React from 'react'
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

class FormButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = { rotate: 0 }
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({ rotate: (this.state.rotate + 90) % 360 })
    }, 200)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    const { children, busy, disabled, ...others } = this.props
    const { rotate } = this.state

    return (
      <Container>
        <Row>
          <Col
            sm={12}
            md={{ offset: 9, span: 3 }}
          >
            <Button
              {...others}
              block
              disabled={disabled || busy}
            >
              {busy && (
                <FontAwesomeIcon icon={faSpinner} size='sm' rotation={rotate || null} />
              )}
              {children}
            </Button>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default FormButton