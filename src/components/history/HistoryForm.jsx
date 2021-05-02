import React from 'react'
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
      hideFilter: {
        hideACTask: false,
        hideNotExistTask: true,
        hideLevel: false,
      },
      contestType: {
        prelim1: true,
        prelim2: true,
        final: true,
        springCamp: true,
        joig: true,
        open: false,
      },
      year: { begin: '2007', end: 'latest' },
      tableContestType: {
        prelim1: true,
        prelim2: true,
        final: true,
        springCamp: true,
        joig: true,
        open: false,
      },
    }
  }

  async componentDidMount() {
    const { location } = this.props
    const params = parseParams(location.search)
    const { myAccount, ...others } = params
    this.setState({
      account: myAccount,
      ...others,
    }, () => {
      this.onSubmit({ unsave: !(params && Object.keys(params).length) })
    })
  }

  onUpdate(key, value) {
    this.setState({ [key]: value })
  }

  onSubmit({ unsave = false } = {}) {
    const { onSubmit, history } = this.props
    const {
      account,
      taskType,
      hideFilter,
      contestType,
      year,
      tableContestType,
    } = this.state

    const input = {
      account,
      taskType,
      hideFilter,
      contestType,
      year,
      tableContestType,
    }

    if (!unsave) {
      const queryString = createParams({
        myAccount: account,
        taskType,
        hideFilter,
        contestType,
        year,
      })
      history.push({ search: queryString })
    }

    if (onSubmit) {
      for (const key in input) {
        input[key] = Object.assign({}, input[key])
      }

      onSubmit(input)
    }
  }

  render() {
    const {
      account,
      taskType,
      contestType,
      year,
      tableContestType,
    } = this.state
    const { busy } = this.props

    return (
      <div>
        <AccountForm
          title='アカウント'
          value={account}
          onUpdate={(v) => this.onUpdate('account', v)}
          onEnter={this.onSubmit.bind(this)}
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
        <YearForm value={year} onUpdate={(v) => this.onUpdate('year', v)} />
        <ContestTypeForm
          title='表示対象大会'
          value={tableContestType}
          index={2}
          onUpdate={(v) => this.onUpdate('tableContestType', v)}
        />
        <FormButton
          variant='info'
          busy={busy}
          onClick={this.onSubmit.bind(this)}
        >
          表示
        </FormButton>
      </div>
    )
  }
}

export default withRouter(HistoryForm)
