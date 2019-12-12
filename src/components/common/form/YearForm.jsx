import React from 'react'
import { Col, Row, Form } from 'react-bootstrap'

class YearForm extends React.Component {
  constructor(props) {
    super(props)

    this.years = []
    const maximumYear = 2020

    for (let year = 2006; year <= maximumYear; year++) {
      this.years.push(year)
    }
  }

  onUpdate(e) {
    const { value, onUpdate } = this.props

    const newValue = Object.assign({}, value)
    newValue[e.target.name] = e.target.value

    if (onUpdate) onUpdate(newValue)
  }

  render() {
    const { value } = this.props

    return (
      <Form.Group as={Row}>
        <Form.Label column sm={2}>
          年度
        </Form.Label>
        <Col sm={4}>
          <Form.Control
            as='select'
            size='sm'
            name='begin'
            value={value.begin}
            onChange={this.onUpdate.bind(this)}
          >
            {
              this.years && this.years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))
            }
          </Form.Control>
        </Col>
        <Col sm={1}>
          〜
        </Col>
        <Col sm={4}>
          <Form.Control
            as='select'
            size='sm'
            name='end'
            value={value.end}
            onChange={this.onUpdate.bind(this)}
          >
            {
              this.years && this.years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))
            }
            <option value={'latest'}></option>
          </Form.Control>
        </Col>
      </Form.Group>
    )
  }
}

export default YearForm