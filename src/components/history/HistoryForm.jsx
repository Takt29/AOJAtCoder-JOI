import React from 'react'
import { Form, Button } from 'react-bootstrap'
import AccountForm from '../common/form/AccountForm'
import TaskTypeForm from '../common/form/TaskTypeForm';
import ContestTypeForm from '../common/form/ContestTypeForm';
import YearForm from '../common/form/YearForm';

class HistoryForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      account: { atcoder: '', aoj: '' },
      taskType: { batch: true, communication: true, outputOnly: false },
      hideFilter: { hideACTask: false, hideNotExistTask: true, hideLevel: false },
      contestType: { prelim: true, final: true, springCamp: true, open: false },
      year: { begin: '2007', end: 'latest' },
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
    const { account, taskType, hideFilter, contestType, year } = this.state

    const input = { account, taskType, hideFilter, contestType, year }

    if (onSubmit) {
      for (const key in input) {
        input[key] = Object.assign({}, input[key])
      }

      onSubmit(input)
    }
  }

  render() {
    const { account, taskType, contestType, year } = this.state

    return (
      <Form>
        <AccountForm
          title='アカウント'
          value={account}
          onUpdate={(v) => this.onUpdate('account', v)}
        />
        <TaskTypeForm
          value={taskType}
          onUpdate={(v) => this.onUpdate('taskType', v)}
        />
        <ContestTypeForm
          value={contestType}
          onUpdate={(v) => this.onUpdate('contestType', v)}
        />
        <YearForm
          value={year}
          onUpdate={(v) => this.onUpdate('year', v)}
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