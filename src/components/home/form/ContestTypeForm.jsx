import React from 'react'
import { Col, Row, Form } from 'react-bootstrap'

class ContestTypeForm extends React.Component {
  onUpdate(e) {
    const { value, onUpdate } = this.props

    const newValue = Object.assign({}, value)
    newValue[e.target.name] = e.target.checked

    if (onUpdate) onUpdate(newValue)
  }

  render() {
    const { value } = this.props

    return (
      <Form.Group as={Row}>
        <Form.Label column sm={2}>
          問題タイプ
        </Form.Label>
        <Col sm={2}>
          <Form.Check
            type="checkbox"
            label="予選"
            name="prelim"
            id="formContestTypePrelim"
            checked={value.prelim}
            onChange={this.onUpdate.bind(this)}
            custom
          />
        </Col>
        <Col sm={2}>
          <Form.Check
            type="checkbox"
            label="本選"
            name="final"
            id="formContestTypeFinal"
            checked={value.final}
            onChange={this.onUpdate.bind(this)}
            custom
          />
        </Col>
        <Col sm={2}>
          <Form.Check
            type="checkbox"
            label="春合宿"
            name="springCamp"
            id="formContestTypeSpringCamp"
            checked={value.springCamp}
            onChange={this.onUpdate.bind(this)}
            custom
          />
        </Col>
        <Col sm={2}>
          <Form.Check
            type="checkbox"
            label="Open"
            name="open"
            id="formContestTypeOpen"
            checked={value.open}
            onChange={this.onUpdate.bind(this)}
            disabled
            custom
          />
        </Col>
      </Form.Group>
    )
  }
}

export default ContestTypeForm