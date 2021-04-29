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
    const { value, title, index = 1 } = this.props

    return (
      <Form.Group as={Row}>
        <Form.Label column sm={2}>
          {title || '大会タイプ'}
        </Form.Label>
        <Col sm={10}>
          <Row>
            <Col sm={4}>
              <Form.Check
                type='checkbox'
                label='一次予選'
                name='prelim1'
                id={`formContestTypePrelim1-${index}`}
                checked={value.prelim1}
                onChange={this.onUpdate.bind(this)}
                custom
              />
            </Col>
            <Col sm={4}>
              <Form.Check
                type='checkbox'
                label='二次予選(旧予選)'
                name='prelim2'
                id={`formContestTypePrelim2-${index}`}
                checked={value.prelim2}
                onChange={this.onUpdate.bind(this)}
                custom
              />
            </Col>
            <Col sm={4}>
              <Form.Check
                type='checkbox'
                label='本選'
                name='final'
                id={`formContestTypeFinal-${index}`}
                checked={value.final}
                onChange={this.onUpdate.bind(this)}
                custom
              />
            </Col>
          </Row>
          <Row>
            <Col sm={4}>
              <Form.Check
                type='checkbox'
                label='春合宿'
                name='springCamp'
                id={`formContestTypeSpringCamp-${index}`}
                checked={value.springCamp}
                onChange={this.onUpdate.bind(this)}
                custom
              />
            </Col>
            <Col sm={4}>
              <Form.Check
                type='checkbox'
                label='Open'
                name='open'
                id={`formContestTypeOpen-${index}`}
                checked={value.open}
                onChange={this.onUpdate.bind(this)}
                custom
              />
            </Col>
            <Col sm={4}>
              <Form.Check
                type='checkbox'
                label='JOIG'
                name='joig'
                id={`formContestTypeJOIG-${index}`}
                checked={value.joig}
                onChange={this.onUpdate.bind(this)}
                custom
              />
            </Col>
          </Row>
        </Col>
      </Form.Group>
    )
  }
}

export default ContestTypeForm
