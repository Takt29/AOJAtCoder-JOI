import React from 'react'
import { Form, Button } from 'react-bootstrap'
import AccountForm from './form/AccountForm'
import TaskTypeForm from './form/TaskTypeForm'
import FilterForm from './form/FilterForm'
import ContestTypeForm from './form/ContestTypeForm'
import YearForm from './form/YearForm'
import styles from './SearchForm.scss'

class SearchForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      myAccount: { atcoder: '', aoj: '' },
      rivalAccount: { atcoder: '', aoj: '' },
      taskType: { batch: true, communication: true, outputOnly: false },
      filter: { hideACTask: false, hideNotExistTask: false, hideLevel: false },
      contestType: { prelim: true, final: true, springCamp: true, open: false },
      year: { begin: '2007', end: 'latest' },
    }
  }

  onUpdate(key, value) {
    this.setState({ [key]: value })
  }

  onSubmit() {
    const { onSubmit } = this.props
    const { myAccount, rivalAccount, taskType, filter, contestType, year } = this.state

    const input = { myAccount, rivalAccount, taskType, filter, contestType, year }

    if (onSubmit) {
      for (const key in input) {
        input[key] = Object.assign({}, input[key])
      }

      onSubmit(input)
    }
  }

  render() {
    const { myAccount, rivalAccount, taskType, filter, contestType, year } = this.state

    return (
      <Form>
        <AccountForm
          title='自分'
          value={myAccount}
          onUpdate={(v) => this.onUpdate('myAccount', v)}
        />
        <AccountForm
          title='ライバル'
          value={rivalAccount}
          onUpdate={(v) => this.onUpdate('rivalAccount', v)}
        />
        <TaskTypeForm
          value={taskType}
          onUpdate={(v) => this.onUpdate('taskType', v)}
        />
        <FilterForm
          value={filter}
          onUpdate={(v) => this.onUpdate('filter', v)}
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

export default SearchForm