import React from 'react'
import { Col, Row, Form, InputGroup } from 'react-bootstrap'

class FilterForm extends React.Component {
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
          フィルタ
        </Form.Label>
        <Col sm={3}>
          <Form.Check
            type="checkbox"
            label="ACした問題を非表示"
            name="hideACTask"
            id="formFilterHideACTask"
            checked={value.hideACTask}
            onChange={this.onUpdate.bind(this)}
            custom
          />
        </Col>
        <Col sm={3}>
          <Form.Check
            type="checkbox"
            label="Judge未存在問題を非表示"
            name="hideNotExistTask"
            id="formFilterHideNotExist"
            checked={value.hideNotExistTask}
            onChange={this.onUpdate.bind(this)}
            custom
          />
        </Col>
        <Col sm={3}>
          <Form.Check
            type="checkbox"
            label="難易度を非表示"
            name="hideLevel"
            id="formFilterHideLevel"
            checked={value.hideLevel}
            onChange={this.onUpdate.bind(this)}
            custom
          />
        </Col>
      </Form.Group>
    )
  }
}

export default FilterForm