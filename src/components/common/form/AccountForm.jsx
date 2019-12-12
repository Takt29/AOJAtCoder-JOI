import React from 'react'
import { Col, Row, Form, InputGroup } from 'react-bootstrap'

class AccountForm extends React.Component {
  constructor(props) {
    super(props)
    this.atcoderIdForm = React.createRef()
    this.aojIdForm = React.createRef()
  }

  componentDidMount() {
    const { onEnter } = this.props

    const listener = (e) => {
      const key = e.which || e.keyCode
      const ENTER_KEY = 13
      if (key === ENTER_KEY && onEnter) {
        onEnter()
      }
    }

    this.atcoderIdForm.current.addEventListener('keypress', listener)
    this.aojIdForm.current.addEventListener('keypress', listener)
  }

  onUpdate(e) {
    const { value, onUpdate } = this.props

    const newValue = Object.assign({}, value)
    newValue[e.target.name] = e.target.value.replace(/\s/g, '')

    if (onUpdate) onUpdate(newValue)
  }

  render() {
    const { title, value } = this.props

    return (
      <Form.Group as={Row}>
        <Form.Label column sm={2}>
          {title}
        </Form.Label>
        <Col sm={5}>
          <InputGroup size="sm" className="sm-3">
            <InputGroup.Prepend>
              <InputGroup.Text>AtCoder</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              ref={this.atcoderIdForm}
              name='atcoder'
              value={value.atcoder}
              onChange={this.onUpdate.bind(this)}
              placeholder={`${title}のAtCoder ID`}
              autoComplete='off'
            />
          </InputGroup>
        </Col>
        <Col sm={5}>
          <InputGroup size="sm" className="sm-3">
            <InputGroup.Prepend>
              <InputGroup.Text>AOJ</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              ref={this.aojIdForm}
              name='aoj'
              value={value.aoj}
              onChange={this.onUpdate.bind(this)}
              placeholder={`${title}のAOJ ID`}
              autoComplete='off'
            />
          </InputGroup>
        </Col>
      </Form.Group>
    )
  }
}

export default AccountForm