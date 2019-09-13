import React from 'react'
import { Form, Button } from 'react-bootstrap'
import AccountForm from '../common/form/AccountForm'

class HistoryForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      account: { atcoder: '', aoj: '' }
    }
  }

  componentDidMount() {
    this.onSubmit()
  }

  onUpdate(key, value) {
    this.setState({ [key]: value })
  }

  onSubmit() {
    const { onSubmit } = this.props
    const { account } = this.state

    const input = { account }

    if (onSubmit) {
      for (const key in input) {
        input[key] = Object.assign({}, input[key])
      }

      onSubmit(input)
    }
  }

  render() {
    const { account } = this.state

    return (
      <Form>
        <AccountForm
          title='アカウント'
          value={account}
          onUpdate={(v) => this.onUpdate('account', v)}
        />
        <Button
          variant='info'
          onClick={this.onSubmit.bind(this)}
        >
          表示
        </Button>
      </Form>
    )
  }
}

export default HistoryForm