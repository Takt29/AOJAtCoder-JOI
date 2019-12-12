import React from 'react'
import { Form } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import AccountForm from '../common/form/AccountForm'
import TaskTypeForm from '../common/form/TaskTypeForm'
import ContestTypeForm from '../common/form/ContestTypeForm'
import YearForm from '../common/form/YearForm'
import FormButton from '../common/form/FormButton'
import { parseParams, createParams } from '../../utils/Params'

class HistoryForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      account: { atcoder: '', aoj: '' },
      taskType: { batch: true, communication: true, outputOnly: false },
      hideFilter: { hideACTask: false, hideNotExistTask: true, hideLevel: false },
      contestType: { prelim1: true, prelim2: true, final: true, springCamp: true, open: false },
      year: { begin: '2007', end: 'latest' },
      tableContestType: { prelim1: true, prelim2: true, final: true, springCamp: true, open: false },
    }
  }

  async componentDidMount() {
    const { location } = this.props
    const queryAccount = parseParams(location.search)
    await this.setState({ account: queryAccount.myAccount })

    this.onSubmit()
  }

  onUpdate(key, value) {
    this.setState({ [key]: value })
  }

  onSubmit() {
    const { onSubmit, history } = this.props
    const { account, taskType, hideFilter, contestType, year, tableContestType } = this.state

    const input = { account, taskType, hideFilter, contestType, year, tableContestType }

    const queryString = createParams({ myAccount: account })
    history.push({ search: queryString })

    if (onSubmit) {
      for (const key in input) {
        input[key] = Object.assign({}, input[key])
      }

      onSubmit(input)
    }
  }

  render() {
    const { account, taskType, contestType, year, tableContestType } = this.state
    const { busy } = this.props

    const handleSubmit = (e) => {
      e.preventDefault()
      this.onSubmit()
    }

    return (
      <Form onSubmit={handleSubmit}>
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
          title='カウント対象大会'
          value={contestType}
          index={1}
          onUpdate={(v) => this.onUpdate('contestType', v)}
        />
        <YearForm
          value={year}
          onUpdate={(v) => this.onUpdate('year', v)}
        />
        <ContestTypeForm
          title='表示対象大会'
          value={tableContestType}
          index={2}
          onUpdate={(v) => this.onUpdate('tableContestType', v)}
        />
        <FormButton
          type='submit'
          variant='info'
          busy={busy}
        >
          表示
        </FormButton>
      </Form>
    )
  }
}

export default withRouter(HistoryForm)