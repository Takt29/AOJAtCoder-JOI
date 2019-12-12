import React from 'react'
import { Form } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import AccountForm from '../common/form/AccountForm'
import TaskTypeForm from '../common/form/TaskTypeForm'
import FilterForm from '../common/form/FilterForm'
import ContestTypeForm from '../common/form/ContestTypeForm'
import YearForm from '../common/form/YearForm'
import FormButton from '../common/form/FormButton'
import { parseParams, createParams } from '../../utils/Params'
import styles from './SearchForm.scss'

class SearchForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      myAccount: { atcoder: '', aoj: '' },
      rivalAccount: { atcoder: '', aoj: '' },
      taskType: { batch: true, communication: true, outputOnly: false },
      hideFilter: { hideACTask: false, hideNotExistTask: false, hideLevel: false },
      contestType: { prelim1: true, prelim2: true, final: true, springCamp: true, open: false },
      year: { begin: '2007', end: 'latest' },
    }
  }

  async componentDidMount() {
    const { location } = this.props
    const queryAccount = parseParams(location.search)
    await this.setState(queryAccount)

    this.onSubmit()
  }

  onUpdate(key, value) {
    this.setState({ [key]: value })
  }

  onSubmit() {
    const { onSubmit, history } = this.props
    const { myAccount, rivalAccount, taskType, hideFilter, contestType, year } = this.state

    const input = { myAccount, rivalAccount, taskType, hideFilter, contestType, year }

    const queryString = createParams({ myAccount, rivalAccount })
    history.push({ search: queryString })

    if (onSubmit) {
      for (const key in input) {
        input[key] = Object.assign({}, input[key])
      }

      onSubmit(input)
    }
  }

  render() {
    const { myAccount, rivalAccount, taskType, hideFilter, contestType, year } = this.state
    const { busy } = this.props

    return (
      <div>
        <AccountForm
          title='自分'
          value={myAccount}
          onUpdate={(v) => this.onUpdate('myAccount', v)}
          onEnter={this.onSubmit.bind(this)}
        />
        <AccountForm
          title='ライバル'
          value={rivalAccount}
          onUpdate={(v) => this.onUpdate('rivalAccount', v)}
          onEnter={this.onSubmit.bind(this)}
        />
        <TaskTypeForm
          value={taskType}
          onUpdate={(v) => this.onUpdate('taskType', v)}
        />
        <FilterForm
          value={hideFilter}
          onUpdate={(v) => this.onUpdate('hideFilter', v)}
        />
        <ContestTypeForm
          value={contestType}
          onUpdate={(v) => this.onUpdate('contestType', v)}
        />
        <YearForm
          value={year}
          onUpdate={(v) => this.onUpdate('year', v)}
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

export default withRouter(SearchForm)