import React from 'react'
import { Col, Row, Form, InputGroup } from 'react-bootstrap'

class TaskTypeForm extends React.Component {
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
        <Col sm={3}>
          <Form.Check
            type="checkbox"
            label="Batch"
            name="batch"
            id="formTaskTypeBatch"
            checked={value.batch}
            onChange={this.onUpdate.bind(this)}
            custom
          />
        </Col>
        <Col sm={3}>
          <Form.Check
            type="checkbox"
            label="Communication"
            name="communication"
            id="formTaskTypeCommunication"
            checked={value.communication}
            onChange={this.onUpdate.bind(this)}
            custom
          />
        </Col>
        <Col sm={3}>
          <Form.Check
            type="checkbox"
            label="OutputOnly"
            name="outputOnly"
            id="formTaskTypeOutputOnly"
            checked={value.outputOnly}
            onChange={this.onUpdate.bind(this)}
            disabled
            custom
          />
        </Col>
      </Form.Group>
    )
  }
}

export default TaskTypeForm